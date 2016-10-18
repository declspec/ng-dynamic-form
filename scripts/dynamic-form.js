(function() {
    var mod = angular.module('dynamic-forms')
        .directive('dynamicForm', DynamicFormDirective)
        .directive('fieldModel', FieldModelDirective)
        .directive('fieldMultiModel', FieldMultiModelDirective)

        .directive('formFieldInput', FormFieldInputDirective)
        .directive('formFieldSelect', FormFieldSelectDirective)
        .directive('formFieldChecklist', FormFieldCheckListDirective)
        .directive('formFieldRadiolist', FormFieldRadioListDirective)
        .directive('formFieldReadonly', FormFieldReadonlyDirective);

    function inherits(target, parent) {
        target.prototype = Object.create(parent.prototype, {
            constructor: {
                value: target,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }

    function extend(target, source) {
        var keys = Object.keys(source);
        for(var k = keys.length-1; k >= 0; --k)
            target[keys[k]] = source[keys[k]];
        return target;
    }

    function labelise(name) {
        var label = name.replace(/([A-Z]+)/g, ' $1')
            .replace(/\W+/g, ' ')
            .replace(/\s{2,}/g, ' ');

        return label[0].toUpperCase() + label.substring(1);
    }

    // Field types
    function FieldBase() { };
    function FieldInput() { };
    function FieldReadonly() { };

    // Inheritance
    inherits(FieldInput, FieldBase);
    inherits(FieldReadonly, FieldBase);

    // Prototype chains
    extend(FieldBase.prototype, {
        restrict: 'EA',
        scope: {},
        transclude: true,
        require: ['^^dynamicForm'],
        link: {
            // Runs prior to the field template's postLink function
            // use this to initialise any priority scope items
            pre: function(scope, $element, attrs, ctrls) {
                return this.preLink(scope, $element, attrs, ctrls);
            },

            // Runs after the field template's postLink
            post: function(scope, $element, attrs, ctrls) {
                return this.postLink(scope, $element, attrs, ctrls);
            }
        },

        preLink: function(scope, $element, attrs, ctrls) {
            if (!attrs['name'])
                throw new TypeError('form-field: missing required attribute "name"');

            scope.name = attrs['name'];
            scope.label = attrs['label'] || labelise(scope.name);
            scope.field = ctrls[0].form.getField(scope.name);

            if (scope.field && attrs['condition']) {
                ctrls[0].form.addFieldCondition(scope.field, attrs['condition'], function(value) {
                    value ? $element.show('fast') : $element.hide();
                });
            }
        },

        postLink: function(scope, $element, attrs, ctrls) { 
            // Empty stub
        }
    });

    FieldInput.prototype.preLink = function(scope, $element, attrs, ctrls) {
        FieldBase.prototype.preLink.call(this, scope, $element, attrs, ctrls);

        if (!attrs['type'])
            throw new TypeError('form-field-input: missing required attribute "type"');
        scope.type = attrs['type'];
    };

    FieldReadonly.prototype.preLink = function(scope, $element, attrs, ctrls) {
        FieldBase.prototype.preLink.call(this, scope, $element, attrs, ctrls);

        scope.value = scope.field.getValue();
        scope.field.on('change', function(field, value) {
            scope.value = value;
        });
    };

    function DynamicFormDirective() {
        return {
            restrict: 'AE',
            controller: 'DynamicFormController',
            scope: { state: '=' },
            controller: [ '$scope', '$parse', function($scope, $parse) {
                if (typeof($scope.state) !== 'object')
                    $scope.state = {};
                this.form = new DynamicForm($scope.state, $parse);
            }]            
        }
    }

    function FieldModelDirective() {
        return { 
            restrict: 'A',
            require: ['^^dynamicForm', 'ngModel' ],
            link: function(scope, $element, attrs, ctrls) {
                if (!attrs['fieldModel'])
                    throw new TypeError('form-model: missing required attribute "field-model"');
                
                var field = ctrls[0].form.getField(attrs['fieldModel']),
                    modelController = ctrls[1];

                // Override model controller methods     
                var commitViewValue = modelController.$commitViewValue;

                modelController.$render = function() {
                    field.setValue(this.$modelValue || this.$viewValue);
                };

                modelController.$commitViewValue = function() {
                    var result = commitViewValue.call(this);
                    field.setValue(this.$modelValue || this.$viewValue);
                    return result;
                };
            }
        };
    }

    function FieldMultiModelDirective() {
        return {
            restrict: 'A',
            require: '^^dynamicForm',
            link: function(scope, $element, attrs, formController) {
                if (!attrs['fieldMultiModel'] || !attrs['value'])
                    throw new TypeError('form-multi-model: missing required attribute "' + (!attrs['fieldMultiModel'] ? 'field-multi-model' : 'value') + '"');

                var field = formController.form.getField(attrs['fieldMultiModel']),
                    element = $element.get(0),
                    value = attrs['value'],
                    allowMultiple = attrs['type'] === 'checkbox';

                field.on('change', onUpdate);

                $element.on('change', function() {
                    return allowMultiple || this.checked
                        ? scope.$apply(processChange)
                        : null;
                }); 

                function processChange() {
                    if (!allowMultiple)
                        return field.setValue(value);
                    
                    var model = field.getValue();
                    if (!Array.isArray(model))
                        model = model ? [ model ] : [];
                        
                    var idx = model.indexOf(value);

                    if (element.checked && idx < 0) {
                        model.push(value);
                        field.setValue(model);
                    }
                    else if (!element.checked && idx >= 0) {
                        model.splice(idx, 1);
                        field.setValue(model);
                    }
                }

                function onUpdate(field, modelValue) {
                    element.checked = modelValue 
                        && ((!Array.isArray(modelValue) && modelValue == value) 
                            || (Array.isArray(modelValue) && modelValue.indexOf(value) >= 0));
                }
            }
        }
    }

    // --
    // Field directives
    //
    function FormFieldInputDirective() {
        var directive = new FieldInput();
        directive.templateUrl = 'templates/input.html';
        return directive;
    }

    function FormFieldReadonlyDirective() {
        var directive = new FieldReadonly();
        directive.templateUrl = 'templates/readonly.html';
        return directive;
    }

     function FormFieldSelectDirective() {
        var directive = new FieldBase();
        directive.templateUrl = 'templates/select.html';
        directive.scope = { items: '=' };
        return directive;
    }

    function FormFieldCheckListDirective() {
        var directive = new FieldBase();
        directive.templateUrl = 'templates/checklist.html';
        directive.scope = {  items: '=' };
        return directive;
    }

    function FormFieldRadioListDirective() {
        var directive = new FieldBase();
        directive.templateUrl = 'templates/radiolist.html';
        directive.scope = { items: '=' };
        return directive;
    }
}());