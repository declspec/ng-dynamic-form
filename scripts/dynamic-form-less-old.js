(function() {
    'use strict';

    function FormField(name, modelController, validators, validatorFactory) {
        this.name = name;
        this.$$listeners = [];
        this.$$ctrl = modelController;
        this.$$state = {};

        var $setViewValue = modelController.$setViewValue;
            self = this;

        modelController.$setViewValue = function(value, trigger) {
            console.log('updating...');
            var result = $setViewValue.call(modelController, value, trigger);
            self.onValueChanged();
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

        onValueChanged: function() {
            var value = this.get();
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


    function BaseFieldDirective(validatorFactory) {
        this.validatorFactory = validatorFactory;
    };

    BaseFieldDirective.prototype = {
        restrict: 'EA',
        require: ['^^dynamicForm', 'ngModel'],
        scope: { model: '=ngModel', validators: '=', properties: '=' },
        link: function(scope, $element, attrs, ctrls) {
            if (!attrs['name'])
                throw new TypeError('form-field: missing required attribute "name"');

            var formController = ctrls[0],
                modelController = ctrls[1];

            var field = new FormField(attrs[name], modelController, scope.validators, this.validatorFactory);
            formController.registerField(field);

            if (this.hasOwnProperty('init') && typeof(this.init) === 'function')
                this.init.apply(this, arguments);
        }
    };

    var mod = angular.module('dynamic-forms');

    mod.config(['ValidatorFactoryProvider', function(validatorFactoryProvider) {
        validatorFactoryProvider.registerValidator('length', function(modelValue, viewValue, args) {
            
        });
    }]);

    mod.directive('modelListener', function() {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function(scope, $element, attrs, ngModelController) {
                var originalSetValue = ngModelController.$setViewValue;

                ngModelController.$render = function() {
                    console.log('render called');
                };

                ngModelController.$setViewValue = function() {
                    console.log('updating view value');
                    return originalSetValue.apply(ngModelController, arguments);
                };
            }
        }
    });

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

    mod.directive('dynamicForm', function() {
        return {
            restrict: 'AE',

            controller: function() {
                var fieldModelMap = {};

                var onFieldUpdated = function(field, value) {
                    console.log('"' + field.name + '": updated to "' + JSON.stringify(value) + '"');
                };

                this.registerField = function(field) {
                    fieldModelMap[field.name] = field;
                    field.addListener(onFieldUpdated);
                };

                this.getField = function(fieldName) {
                    return fieldModelMap[fieldName] || null;
                };
            }
        }
    });

    mod.directive('formFieldText', [ 'ValidatorFactory', function(validatorFactory) {
        var directive = new BaseFieldDirective(validatorFactory);

        directive.templateUrl = 'templates/text.html';

        directive.init = function() {
            console.log('custom init');
        };

        return directive;
    }]);
}());