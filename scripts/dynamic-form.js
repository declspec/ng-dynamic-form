(function() {
    'use strict';

    function BaseFieldDirective(validatorFactory) {
        this.validatorFactory = validatorFactory;
    };

    BaseFieldDirective.prototype = {
        restrict: 'EA',
        require: '^^dynamicForm',
        replace: true,
        scope: { model: '=ngModel', validators: '=', properties: '=' },
        link: function(scope, $element, attrs, form) {
            if (!attrs['name'])
                throw new TypeError('form-field: missing required attribute "type"');

            if (this.hasOwnProperty('init') && typeof(this.init) === 'function')
                this.init.apply(this, arguments);

            // Internal variables
            var model = scope.model,
                validationMessages = {},
                field = scope.field = Object.assign({}, attrs, scope.properties || {});
                
            form.registerFieldModel(attrs['name'], model);

            // Initialise any validators 
            if (Array.isArray(scope.validators) && scope.validators.length) {
                for(var i = 0, j = scope.validators.length; i < j; ++i) {
                    var meta = validators[i],
                        validator = null,
                        args = null;

                    if (typeof(validator) === 'string')
                        validator = this.validatorFactory.get(validator);
                    else if (typeof(validator) === 'object' && validator.hasOwnProperty('name')) {
                        validator = this.validatorFactory.get(validator.name);
                        args = validator.args || null;
                    }

                    var collection = validator.async ? model.$validators : model.$asyncValidators;
                    collection[validator.name] = function(modelValue, viewValue) {
                        // Deliberate 'call' instead of 'apply', should only pass one 'option-like' argument
                        // otherwise the argument naming would make no sense.
                        var result = validator.fn.call(validator, modelValue, viewValue, args);
                        if (result === true)
                            delete validationMessage[validator.name];
                        else if (typeof(result) === 'string')
                            validationMessages[validator.name] = result;
                        
                        return !!result;
                    };
                }
            }
        }
    };

    var mod = angular.module('dynamic-forms');

    mod.config(['ValidatorFactoryProvider', function(validatorFactoryProvider) {
        validatorFactoryProvider.registerValidator('length', function(modelValue, viewValue, args) {
            var value = modelValue || viewValue;
            if (!value
        });
    }]);

    mod.provider('ValidatorFactoryProvider', function() {
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

                this.registerFieldModel = function(fieldName, model) {
                    fieldModelMap[fieldName] = model;
                };

                this.getFieldModel = function(fieldName) {
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