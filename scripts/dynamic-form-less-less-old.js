(function() {
    'use strict';

    var ngModule = angular.module('dynamic-forms')
        .provider('ValidatorFactory', ValidatorFactory)
        .controller('DynamicFormController', DynamicFormController)
    
        .directive('dynamicForm', DynamicFormDirective)
        .directive('validators', ValidatorsDirective)
        .directive('formField', FormFieldDirective)
        .directive('multiModel', MultiModelDirective)
        .directive('formFieldInput', FormFieldInputDirective)
        .directive('formFieldSelect', FormFieldSelectDirective)
        .directive('formFieldChecklist', FormFieldCheckListDirective)
        .directive('formFieldRadiolist', FormFieldRadioListDirective)
        .directive('ngModel', NgModelDirective);

    ngModule.config(['ValidatorFactoryProvider', function(validatorFactoryProvider) {
        validatorFactoryProvider.register('required', function(field, modelValue, viewValue) {
            console.log('required');
            var value = modelValue || viewValue;
            return !value
                ? field.label + ' is a required field; please specify it.'
                : true;
        });
    }]);

    function labelise(name) {
        var label = name.replace(/([A-Z]+)/g, ' $1')
            .replace(/\W+/g, ' ')
            .replace(/\s{2,}/g, ' ');

        return label[0].toUpperCase() + label.substring(1);
    }

    function FieldDirective(preLink, postLink) {
        this.preLink = preLink || null;
        this.postLink = postLink || null;
    };

    FieldDirective.prototype = {
        restrict: 'EA',
        scope: {},
        require: ['^^dynamicForm'],
        link: {
            // Runs prior to the field template's postLink function
            // use this to initialise any priority scope items
            pre: function(scope, $element, attrs, ctrls) {
                if (!attrs['name'])
                    throw new TypeError('form-field: missing required attribute "name"');

                scope.name = attrs['name'];
                scope.label = attrs['label'] || labelise(scope.name);

                if (this.preLink !== null)
                    this.preLink(scope, $element, attrs, ctrls);
            },

            // Runs after the field template's child directives have
            // been linked. In this case the form-field directive (if present)
            // should've been run and registered itself with the form.
            post: function(scope, $element, attrs, ctrls) {
                var field = ctrls[0].getField(scope.name);

                if (field && attrs['condition']) {
                    ctrls[0].registerCondition(attrs['condition'], function(value) {
                        value ? $element.show('fast') : $element.hide();
                        field.setActive(value);
                    });
                }

                if (this.postLink !== null)
                    this.postLink(scope, $element, attrs, ctrls);
            }
        }
    };

    FormField.prototype = Object.create(EventEmitter.prototype);

    function FormField(name) {
        // Invoke the constructor for EventEmitter (essentially 'super()')
        EventEmitter.prototype.constructor.call(this);

        this.name = name;
        this.value = undefined;

        this.$$errors = {};
        this.$$active = true;
    }

    // Use Object.assign to avoid wiping out the EventEmitter prototype.
    Object.assign(FormField.prototype, (function() {
        function triggerValueChange(field, value) {
            field.emit('change', field, value);
        }

        return {
            setValue: function(value) {
                this.value = value;
                triggerValueChange(this, value);
            },

            getValue: function() {
                return this.value;
            },

            setActive: function(active) {
                if (active !== this.$$active) {
                    triggerValueChange(this, active ? this.value : null);
                    this.$$active = active;
                    this.emit('active', this, active);
                }
            },

            setError: function(type, value) {
                if (!this.$$errors.hasOwnProperty(type) || this.$$errors[type] !== value) {
                    // prevent the same error emitting over and over 
                    // (i.e failing 'min-length' validation 99 times while typing out a 100 char string)
                    this.$$errors[type] = value;
                    this.emit('error', type, value);
                }
            }
        }
    }()));

    function ValidatorFactory() {
        var validators = {};

        this.register = function(name, isAsync, validatorFn) {
            if (validators.hasOwnProperty(name))
                console.warn('overwriting previously registered validator "' + name + '"');

            if (!validatorFn && typeof(isAsync) === 'function') {
                validatorFn = isAsync
                isAsync = false;
            }

            validators[name] = { 'async': !!isAsync, 'name': name, 'fn': validatorFn };
        };

        this.$get = function() {
            return function(name) {
                return validators[name] || null;
            };
        };
    }

    DynamicFormController.$inject = [ '$scope', '$parse' ];
    function DynamicFormController($scope, $parse) {
        var fieldMap = {},
            watchedFields = {};

        var state = $scope.state || ($scope.state = {});

        var onFieldUpdated = function(field, value) {
            state[field.name] = value;

            if (!watchedFields.hasOwnProperty(field.name))
                return;
            
            // This seems to be a little bit backwards as each field is an EventEmitter
            // so you could just subscribe via 'on' directly.
            // However, that would rely on the field already being created
            // at the time that another field requests to watch it, this way allows for
            // deferred field resolution.
            var handlers = watchedFields[field.name];
            for(var i = 0, j = handlers.length; i < j; ++i) {
                handlers[i](field);
            }
        };

        this.registerField = function(field, condition) {
            fieldMap[field.name] = field;
            field.on('change', onFieldUpdated);

            // Initialise the field from the current state (if present)
            if (state.hasOwnProperty(field.name))
                field.setValue(state[field.name]);
        };

        this.getField = function(fieldName) {
            return fieldMap[fieldName] || null;
        };

        this.registerCondition = function(condition, callback) {
            var dependentFields = [];
            // At this time there doesn't seem to be a way to extract the
            // variables out of a $parsed expression in order to know what
            // needs to be provided. Due to this we use our own special (stupid)
            // syntax to lightly sugar the expression (essentially just wrap all the field names in square brackets)
            var condition = condition.replace(/\[(\w+)\]/g, function(m, fieldName) {
                if (dependentFields.indexOf(fieldName) < 0)
                    dependentFields.push(fieldName);
                return fieldName;
            });

            if (dependentFields.length === 0)
                throw new Error('dynamic-form: conditional expression does not contain any field references');

            var parsedExpr = $parse(condition),
                lastValue;

            var conditionalFn = function() {
                var result = parsedExpr(state);
                if (result !== lastValue)
                    callback(result);
            };

            for(var i = 0, j = dependentFields.length; i < j; ++i) {
                var fieldName = dependentFields[i];
                if (!watchedFields.hasOwnProperty(fieldName))
                    watchedFields[fieldName] = [];
                watchedFields[fieldName].push(conditionalFn);
            }

            // Run the condition once to initialise
            conditionalFn();
        };
    }

    function DynamicFormDirective() {
        return {
            restrict: 'AE',
            controller: 'DynamicFormController',
            scope: { state: '=' }
        };
    }

    FormFieldDirective.$inject = [ 'ValidatorFactory' ];
    function FormFieldDirective(validatorFactory) {
        return {
            restrict: 'A',
            require: [ 'formField', '^^dynamicForm' ],
            controller: function() {  },
            link: { pre: preLink }
        };

        function preLink(scope, $element, attrs, ctrls) {
            if (!attrs['formField'])
                throw new TypeError('form-field: missing required attribute "form-field"');

            var thisController = ctrls[0],
                formController = ctrls[1];

            var field = new FormField(attrs['formField']);
            thisController.field = field;
            formController.registerField(field);
        }
    }

    function NgModelDirective() {
        return {
            restrict: 'A',
            require: ['ngModel', '?^formField'],
            priority: 0,
            link: function(scope, $element, attrs, ctrls) {
                if (!ctrls[1])
                    return;

                var modelController = ctrls[0],
                    field = ctrls[1].field;

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
        }
    }

    function MultiModelDirective() {
        return {
            restrict: 'A',
            require: '^^formField',
            link: function(scope, $element, attrs, formFieldController) {
                if (!attrs['multiModel'])
                    throw new TypeError('multi-model: missing required attribute "multi-model"');
                
                var value = attrs['multiModel'],
                    element = $element.get(0),
                    field = formFieldController.field,
                    allowMultiple = $element.attr('type') === 'checkbox';

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
        };
    }

    function ValidatorsDirective() {
        return {
            restrict: 'A',
            controller: [ '$scope', '$attrs', function($scope, $attrs) {
                this.validators = $scope.$eval($attrs['validators']);
            }]
        }   
    }   

    function FormFieldInputDirective() {
        var directive = new FieldDirective(preLink);
        directive.templateUrl = 'templates/input.html';

        return directive;

        function preLink(scope, $element, attrs, formController) {
            if (!attrs['type'])
                throw new TypeError('form-field-input: missing required attribute "type"');
            scope.type = attrs['type'];
        };
    }

    function FormFieldSelectDirective() {
        var directive = new FieldDirective();
        directive.templateUrl = 'templates/select.html';
        directive.scope = { items: '=' };

        return directive;
    }

    function FormFieldCheckListDirective() {
        var directive = new FieldDirective();
        directive.templateUrl = 'templates/checklist.html';
        directive.scope = {  items: '=' };
        
        return directive;
    }

    function FormFieldRadioListDirective() {
        var directive = new FieldDirective();
        directive.templateUrl = 'templates/radiolist.html';
        directive.scope = { items: '=' };
        
        return directive;
    }

    function FormFieldViewDirective() {
        var directive = new FieldDirective();
        directive.templateUrl = 'templates/radiolist.html';

        return directive;

        function postLink(scope, $element, attrs, ctrls) {
            var field = ctrls
        }
    }

    function FormFieldReadonlyDirective() {
        var directive = new FieldDirective();
        directive.templateUrl = 'templates/readonly.html';

        return directive;

        function postLink(scope, $element, attrs) {
            
        }
    }
}());