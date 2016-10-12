(function() {
    'use strict';

    function labelise(name) {
        var label = name.replace(/([A-Z]+)/g, ' $1')
            .replace(/\W+/g, ' ')
            .replace(/\s{2,}/g, ' ');

        return label[0].toUpperCase() + label.substring(1);
    }

    function fieldPreLink(scope, $element, attrs, formController) {
        if (!attrs['name'])
            throw new TypeError('form-field: missing required attribute "name"');

        var field;

        scope.name = attrs['name'];
        scope.label = attrs['label'] || labelise(scope.name);

        if (attrs['condition']) {
            formController.registerCondition(attrs['condition'], function(value) {
                if (value)
                    return $element.show('fast');
                else {
                    $element.hide();
                    if (!field) field = formController.getField(scope.name);
                    field.onValueChanged(null);
                }
            });
        }
    }

    function FormField(name, modelController, validators, validatorFactory) {
        this.name = name;
        this.$$listeners = [];
        this.$$ctrl = modelController;
        this.$$state = {};

        var setViewValue = modelController.$setViewValue,
            self = this;

        modelController.$render = function() {
            self.onValueChanged();
        };

        modelController.$setViewValue = function(value, trigger) {
            var result = setViewValue.call(self.$$ctrl, value, trigger);
            self.onValueChanged(self.get());
            return result;
        };

        if (validators && validators.length) {
            for(var i = 0, j = validators.length; i < j; ++i) {
                var meta = validators[i],
                    validator = null,
                    args = null;
                
                if (typeof(meta) === 'string') 
                    validator = validatorFactory.get(meta);
                else if (typeof(meta) === 'object' && meta.hasOwnProperty('name')) {
                    validator = validatorFactory.get(meta.name);
                    args = meta.args || null;
                }

                var collection = validator.async 
                    ? model.$validators 
                    : model.$asyncValidators;
                    
                collection[validator.name] = function(modelValue, viewValue) {
                    // Deliberate 'call' instead of 'apply', should only pass one 'option-like' argument
                    // otherwise the argument naming would make no sense.
                    var result = validator.fn.call(validator, modelValue, viewValue, args);
                    if (result === true) {
                        self.clearError(validator.name);
                        return true;
                    }
                    else {
                        self.setError(validator.name, result);
                        return false;
                    }
                };
            }
        }
    }

    FormField.prototype = {
        addListener: function(listener) {
            if (typeof(listener) !== 'function')
                throw new TypeError('FormField#addListener: listener must be a function');
            this.$$listeners.push(listener);
        },

        onValueChanged: function(value) {
            for(var i = 0, j = this.$$listeners.length; i < j; ++i) {
                var listener = this.$$listeners[i];
                listener(this, value);
            }
        },

        get: function() {
            return this.$$ctrl.$modelValue || this.$$ctrl.$viewValue;
        },

        setError: function(type, message) {
            this.$$state[type] = message;
        },

        clearError: function(type) {
            delete this.$$state[type];
        }
    };

    var mod = angular.module('dynamic-forms');

    mod.provider('ValidatorFactory', function() {
        var validators = {};

        this.registerValidator = function(name, isAsync, validatorFn) {
            if (validators.hasOwnProperty(name))
                console.warn('overwriting previously registered validator "' + name + '"');

            if (!validatorFn && typeof(isAsync) === 'function') {
                validatorFn = isAsync
                isAsync = false;
            }

            validators[name] = { 'async': !!isAsync, 'name': name, 'fn': validatorFn };
        };

        this.$get = function() {
            return {
                getValidator: function(name) {
                    return validators[name] || null;
                }
            };
        };
    });

    mod.controller('DynamicFormController', [ '$parse', function($parse) {
        var fieldMap = {},
            watchedFields = {},
            state = {};

        var onFieldUpdated = function(field, value) {
            state[field.name] = value;

            if (!watchedFields.hasOwnProperty(field.name))
                return;
            
            var handlers = watchedFields[field.name];
            for(var i = 0, j = handlers.length; i < j; ++i) {
                handlers[i](field);
            }
        };

        this.registerField = function(field, condition) {
            fieldMap[field.name] = field;
            field.addListener(onFieldUpdated);
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
    }]);

    mod.directive('dynamicForm', [ '$parse', function($parse) {
        return {
            restrict: 'AE',
            controller: 'DynamicFormController'
        };
    }]);

    mod.directive('formField', [ 'ValidatorFactory', function(validatorFactory) {
        return {
            restrict: 'A',
            require: [ '^^dynamicForm', 'ngModel' ],
            link: function(scope, $element, attrs, ctrls) {
                if (!attrs['formField'])
                    throw new TypeError('form-field: missing required attribute "form-field"');
                
                var formController = ctrls[0],
                    modelController = ctrls[1];
                
                var field = new FormField(attrs['formField'], modelController, null, validatorFactory);
                formController.registerField(field);
            }
        };
    }]);

    mod.directive('formFieldInput', function() {
        return {
            restrict: 'EA',
            templateUrl: 'templates/input.html',
            require: '^^dynamicForm',
            scope: { model: '=' },
            // Must provide a pre-link as this needs to run *before* the nested
            // form-field's link is invoked or none of the scope variables will be available
            link: { pre: preLink }
        };

        function preLink(scope, $element, attrs, formController) {
            fieldPreLink(scope, $element, attrs, formController);
            
            if (!attrs['type'])
                throw new TypeError('form-field-input: missing required attribute "type"');
            scope.type = attrs['type'];
        };
    });

    mod.directive('formFieldSelect', function() {
        return {
            restrict: 'EA',
            templateUrl: 'templates/select.html',
            require: '^^dynamicForm',
            scope: { model: '=', items: '=' },
            // Must provide a pre-link as this needs to run *before* the nested
            // form-field's link is invoked or none of the scope variables will be available
            link: { pre: preLink }
        };

        function preLink(scope, $element, attrs, formController) {
            fieldPreLink(scope, $element, attrs, formController);
        };
    });
}());