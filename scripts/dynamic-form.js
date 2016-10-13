(function() {
    'use strict';

    var ngModule = angular.module('dynamic-forms')
        .provider('ValidatorFactory', ValidatorFactory)
        .controller('DynamicFormController', DynamicFormController)
    
        .directive('dynamicForm', DynamicFormDirective)
        .directive('validators', ValidatorsDirective)
        .directive('formField', FormFieldDirective)
        .directive('formFieldInput', FormFieldInputDirective)
        .directive('formFieldSelect', FormFieldSelectDirective);

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

    //
    // Hooks some core NgModelController methods to update the field
    // value.
    //
    function hookModelController(modelController, field) {
        var commitViewValue = modelController.$commitViewValue;

        modelController.$render = function() {
            field.onValueChanged(this.$modelValue || this.$viewValue);
        };

        modelController.$commitViewValue = function() {
            var result = commitViewValue.call(this);
            field.onValueChanged(this.$modelValue || this.$viewValue);
            return result;
        };

        return modelController;
    }

    function FieldDirective(preLink, postLink) {
        this.preLink = preLink || null;
        this.postLink = postLink || null;
    };

    FieldDirective.prototype = {
        restrict: 'EA',
        require: '^^dynamicForm',
        link: {
            // Runs prior to the field template's postLink function
            // use this to initialise any priority scope items
            pre: function(scope, $element, attrs, formController) {
                if (!attrs['name'])
                    throw new TypeError('form-field: missing required attribute "name"');

                scope.name = attrs['name'];
                scope.label = attrs['label'] || labelise(scope.name);

                if (this.preLink !== null)
                    this.preLink(scope, $element, attrs, formController);
            },

            // Runs after the field template's child directives have
            // been linked. In this case the form-field directive (if present)
            // should've been run and registered itself with the form.
            post: function(scope, $element, attrs, formController) {
                var field = formController.getField(scope.name);

                if (field && attrs['condition']) {
                    formController.registerCondition(attrs['condition'], function(value) {
                        value ? $element.show('fast') : $element.hide();
                        field.setActive(value);
                    });
                }

                if (this.postLink !== null)
                    this.postLink(scope, $element, attrs, formController);
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
    Object.assign(FormField.prototype, {
        onValueChanged: function(value) {
            this.value = value;
            this.emit('change', this, value);
        },

        setActive: function(active) {
            if (active !== this.$$active) {
                this.onValueChanged(active ? this.value : null);
                this.$$active = active;
                this.emit('active', this, active);
            }
        },

        value: function() {
            return this.$$ctrl.$modelValue || this.$$ctrl.$viewValue;
        },

        setError: function(type, value) {
            if (!this.$$errors.hasOwnProperty(type) || this.$$errors[type] !== value) {
                // prevent the same error emitting over and over 
                // (i.e failing 'min-length' validation 99 times while typing out a 100 char string)
                this.$$errors[type] = value;
                this.emit('error', type, value);
            }
        }
    });

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

    DynamicFormController.$inject = [ '$parse' ];
    function DynamicFormController($parse) {
        var fieldMap = {},
            watchedFields = {},
            state = {};

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
                    watchedFields[fieldName] = [ conditionalFn ];
                else 
                    watchedFields[fieldName].push(conditionalFn);
            }

            // Run the condition once to initialise
            conditionalFn();
        };
    }

    FormFieldDirective.$inject = [ 'ValidatorFactory' ];
    function FormFieldDirective(validatorFactory) {
        return {
            restrict: 'A',
            require: [ 'formField', '^^dynamicForm', 'ngModel', '?^validators' ],
            controller: function() { },
            link: function(scope, $element, attrs, ctrls) {
                if (!attrs['formField'])
                    throw new TypeError('form-field: missing required attribute "form-field"');

                var thisController = ctrls[0],
                    formController = ctrls[1];

                var field = new FormField(attrs['formField']);
                thisController.field = field;
                formController.registerField(field);

                // Override model controller methods
                hookModelController(ctrls[2]);
            }
        };
    }

    MultiFormFieldDirective.$inject = [ '$parse' ];
    function MultiFormFieldDirective($parse) {
        return {
            restrict: 'A',
            require:  '^ngModel',
            controller: function() { },
            link: function(scope, $element, attrs, modelController) {
                if (!attrs['multiFormField'])
                    throw new TypeError('multi-form-field: missing required attribute "multi-form-field"');
                
                var valueGetter = $parse(attrs['multiFormField']),
                    allowMultiple = $element.attr('type') === 'checkbox';

                scope.$watchCollection(function() {
                    return modelController.$modelValue;
                }, function(newValue, oldValue) {

                });

                $element.on('change', function() {
                    if (!allowMultiple)
                        return modelController.$setViewValue(valueGetter(scope));

                    

                }); 

                


                var thisController = ctrls[0],
                    formController = ctrls[1];

                var field = new FormField(attrs['formField']);
                thisController.field = field;
                formController.registerField(field);

                // Override model controller methods
                var modelController = ctrls[2];
                    
            }
        };
    }

    function DynamicFormDirective() {
        return {
            restrict: 'AE',
            controller: 'DynamicFormController'
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
        directive.scope = { model: '=' };

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
        directive.scope = { model: '=', items: '=' };

        return directive;
    }
}());