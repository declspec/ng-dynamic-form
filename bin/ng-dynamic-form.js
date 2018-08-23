(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ng-dynamic-form"] = factory();
	else
		root["ng-dynamic-form"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "bin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(1);
module.exports = lib;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof3(exports)) === 'object' && ( false ? 'undefined' : _typeof3(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof3(exports)) === 'object') exports["ng-dynamic-form"] = factory();else root["ng-dynamic-form"] = factory();
})(typeof self !== 'undefined' ? self : undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "bin/";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 0);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var lib = __webpack_require__(1);
            module.exports = lib;

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            /* WEBPACK VAR INJECTION */
            (function (module) {
                var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

                var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
                    return typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
                } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
                };

                (function webpackUniversalModuleDefinition(root, factory) {
                    if ((false ? 'undefined' : _typeof2(exports)) === 'object' && (false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["ng-dynamic-form"] = factory();else root["ng-dynamic-form"] = factory();
                })(typeof self !== 'undefined' ? self : undefined, function () {
                    return (/******/function (modules) {
                            // webpackBootstrap
                            /******/ // The module cache
                            /******/var installedModules = {};
                            /******/
                            /******/ // The require function
                            /******/function __webpack_require__(moduleId) {
                                /******/
                                /******/ // Check if module is in cache
                                /******/if (installedModules[moduleId]) {
                                    /******/return installedModules[moduleId].exports;
                                    /******/
                                }
                                /******/ // Create a new module (and put it into the cache)
                                /******/var module = installedModules[moduleId] = {
                                    /******/i: moduleId,
                                    /******/l: false,
                                    /******/exports: {}
                                    /******/ };
                                /******/
                                /******/ // Execute the module function
                                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                                /******/
                                /******/ // Flag the module as loaded
                                /******/module.l = true;
                                /******/
                                /******/ // Return the exports of the module
                                /******/return module.exports;
                                /******/
                            }
                            /******/
                            /******/
                            /******/ // expose the modules object (__webpack_modules__)
                            /******/__webpack_require__.m = modules;
                            /******/
                            /******/ // expose the module cache
                            /******/__webpack_require__.c = installedModules;
                            /******/
                            /******/ // define getter function for harmony exports
                            /******/__webpack_require__.d = function (exports, name, getter) {
                                /******/if (!__webpack_require__.o(exports, name)) {
                                    /******/Object.defineProperty(exports, name, {
                                        /******/configurable: false,
                                        /******/enumerable: true,
                                        /******/get: getter
                                        /******/ });
                                    /******/
                                }
                                /******/
                            };
                            /******/
                            /******/ // getDefaultExport function for compatibility with non-harmony modules
                            /******/__webpack_require__.n = function (module) {
                                /******/var getter = module && module.__esModule ?
                                /******/function getDefault() {
                                    return module['default'];
                                } :
                                /******/function getModuleExports() {
                                    return module;
                                };
                                /******/__webpack_require__.d(getter, 'a', getter);
                                /******/return getter;
                                /******/
                            };
                            /******/
                            /******/ // Object.prototype.hasOwnProperty.call
                            /******/__webpack_require__.o = function (object, property) {
                                return Object.prototype.hasOwnProperty.call(object, property);
                            };
                            /******/
                            /******/ // __webpack_public_path__
                            /******/__webpack_require__.p = "bin/";
                            /******/
                            /******/ // Load entry module and return exports
                            /******/return __webpack_require__(__webpack_require__.s = 0);
                            /******/
                        }(
                        /************************************************************************/
                        /******/[
                        /* 0 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _form = __webpack_require__(1);

                            var _form2 = _interopRequireDefault(_form);

                            var _validatorFactory = __webpack_require__(4);

                            var _directives = __webpack_require__(5);

                            var d = _interopRequireWildcard(_directives);

                            var _validators = __webpack_require__(15);

                            var v = _interopRequireWildcard(_validators);

                            function _interopRequireWildcard(obj) {
                                if (obj && obj.__esModule) {
                                    return obj;
                                } else {
                                    var newObj = {};if (obj != null) {
                                        for (var key in obj) {
                                            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                                        }
                                    }newObj.default = obj;return newObj;
                                }
                            }

                            function _interopRequireDefault(obj) {
                                return obj && obj.__esModule ? obj : { default: obj };
                            }

                            var lib = angular.module('ng-dynamic-form', []).service('FormBuilder', FormBuilderService).provider('ValidatorFactory', _validatorFactory.ValidatorFactoryProvider).directive('dynamicForm', wrap(d.DynamicFormDirective)).directive('fieldModel', wrap(d.FieldModelDirective)).directive('fieldMultiModel', wrap(d.FieldMultiModelDirective)).directive('fieldCondition', wrap(d.FieldConditionDirective)).directive('fieldConditionFor', wrap(d.FieldConditionForDirective)).directive('multiFieldConditionFor', wrap(d.MultiFieldConditionForDirective)).directive('fieldValidationFor', wrap(d.FieldValidationForDirective)).directive('fieldValidationMessageFor', wrap(d.FieldValidationMessageForDirective)).directive('fieldValidationMessagesFor', wrap(d.FieldValidationMessagesForDirective));

                            // Configure validators
                            lib.config(['ValidatorFactoryProvider', function (validatorFactoryProvider) {
                                validatorFactoryProvider.register('required', false, v.RequiredValidator);
                                validatorFactoryProvider.register('numeric', false, v.NumericValidator);
                            }]);

                            exports.default = lib.name;

                            // --
                            // Internal helpers to create services/directives
                            // --

                            FormBuilderService.$inject = ['$parse', '$q'];
                            function FormBuilderService($parse, $q) {
                                this.build = function (state) {
                                    return new _form2.default(state, $parse, $q);
                                };
                            }

                            function wrap(ctor) {
                                var inject = ctor.dependencies || ctor.prototype.dependencies;
                                if (!inject) return function () {
                                    return new ctor();
                                };

                                var factory = function factory() {
                                    return new (Function.prototype.bind.apply(ctor, [null].concat(Array.prototype.slice.call(arguments))))();
                                };
                                factory.$inject = inject;
                                return factory;
                            }

                            /***/
                        },
                        /* 1 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            } : function (obj) {
                                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            };

                            var _field = __webpack_require__(2);

                            var _field2 = _interopRequireDefault(_field);

                            function _interopRequireDefault(obj) {
                                return obj && obj.__esModule ? obj : { default: obj };
                            }

                            function Form(initialState, parser, promise) {
                                this.valid = true;
                                this.validating = 0;

                                this.$$fields = {};
                                this.$$parser = parser;
                                this.$$q = promise;
                                this.$$state = Object.assign({}, initialState);
                                this.$$validationTrigger = 'change';

                                this.$init();
                            }

                            Form.prototype = {
                                $init: function $init(state) {
                                    var self = this;

                                    // Create local bindings
                                    this.$onFieldChanged = function (field) {
                                        onFieldChanged(self, field);
                                    };

                                    this.$onFieldValidated = function (field, previouslyValid) {
                                        onFieldValidated(self, field, previouslyValid);
                                    };
                                },

                                validate: function validate() {
                                    var pendingValidations = [],
                                        fields = this.$$fields,
                                        self = this;

                                    for (var fieldName in fields) {
                                        if (fields.hasOwnProperty(fieldName)) {
                                            var field = fields[fieldName],
                                                promise = validateFormField(self, field);

                                            // validateFormField returns null when the field doesn't
                                            // require any sort of validation. 
                                            if (promise !== null) pendingValidations.push(promise);
                                        }
                                    }

                                    // Wait for all the validation promises to run
                                    return this.$$q.all(pendingValidations).then(function (results) {
                                        return self.valid;
                                    });
                                },

                                setFieldDependencies: function setFieldDependencies(fieldName, dependencyNames) {
                                    var _this = this;

                                    var field = this.getField(fieldName);
                                    var dependencies = Array.isArray(dependencyNames) ? dependencyNames.map(function (name) {
                                        return _this.getField(name);
                                    }) : [this.getField(dependencyNames)];

                                    var listener = function listener(f) {
                                        field.invalidate();
                                        field.emit('change', field, field.val());
                                    };

                                    for (var i = 0, j = dependencies.length; i < j; ++i) {
                                        dependencies[i].on('change', listener);
                                        dependencies[i].on('toggle', listener);
                                    }
                                },

                                setValidationTrigger: function setValidationTrigger(trigger) {
                                    trigger = trigger || 'change';
                                    if (trigger !== 'change' && trigger !== 'manual') throw new Error('Unexpected validation trigger encountered; expected one of "manual" or "change", got ' + trigger);

                                    this.$$validationTrigger = trigger;
                                },

                                getState: function getState() {
                                    return this.$$state;
                                },

                                getStateValue: function getStateValue(fieldName) {
                                    var bits = fieldName.split('.'),
                                        root = getStateRoot(this.$$state, bits);

                                    return root[bits[bits.length - 1]];
                                },

                                valueOf: function valueOf(fieldName) {
                                    return this.$$fields.hasOwnProperty(fieldName) ? this.$$fields[fieldName].val() : undefined;
                                },

                                getField: function getField(name) {
                                    return this.$$fields.hasOwnProperty(name) ? this.$$fields[name] : addField(this, name);
                                },

                                getFields: function getFields() {
                                    var fields = this.$$fields,
                                        arr = [];

                                    for (var fieldName in fields) {
                                        if (fields.hasOwnProperty(fieldName)) arr.push(fields[fieldName]);
                                    }

                                    return arr;
                                },

                                hasDirtyFields: function hasDirtyFields() {
                                    var fields = this.$$fields,
                                        field;

                                    for (var fieldName in fields) {
                                        if (fields.hasOwnProperty(fieldName)) {
                                            field = fields[fieldName];
                                            if (field.isActive() && field.isDirty()) return true;
                                        }
                                    }

                                    return false;
                                },

                                setPristine: function setPristine() {
                                    var fields = this.$$fields;

                                    for (var fieldName in fields) {
                                        if (fields.hasOwnProperty(fieldName)) fields[fieldName].setDirty(false);
                                    }
                                },

                                addCondition: function addCondition(condition, scope, callback) {
                                    var _this2 = this;

                                    if (!callback && typeof scope === 'function') {
                                        callback = scope;
                                        scope = null;
                                    }

                                    var dependentFields = [];
                                    // At this time there doesn't seem to be a way to extract the
                                    // variables out of a $parsed expression in order to know what
                                    // needs to be provided. Due to this we use our own special (stupid)
                                    // syntax to lightly sugar the expression (essentially just wrap all the field names in square brackets)
                                    var condition = condition.replace(/\[([a-zA-Z\$_][\w.]+)\]/g, function (m, fieldName) {
                                        if (dependentFields.indexOf(fieldName) < 0) dependentFields.push(fieldName);
                                        return fieldName;
                                    });

                                    if (dependentFields.length === 0) throw new Error('Form::addCondition(): conditional expression does not contain any field references');

                                    var parsedExpr = this.$$parser(condition),
                                        fields = {},
                                        lastValue;

                                    for (var i = 0, j = dependentFields.length; i < j; ++i) {
                                        var field = this.getField(dependentFields[i]);
                                        setStateValue(fields, field.name, field);

                                        field.on('toggle', checkCondition);
                                        field.on('change', checkCondition);
                                    }

                                    // Run the condition once to initialise
                                    checkCondition();

                                    // Return a function that can be called to remove the listeners
                                    return function () {
                                        for (var i = 0, j = dependentFields.length; i < j; ++i) {
                                            var field = _this2.getField(dependentFields[i]);
                                            field.off('toggle', checkCondition);
                                            field.off('change', checkCondition);
                                        }
                                    };

                                    function checkCondition() {
                                        var result = parsedExpr(scope, fields) || false;
                                        if (result !== lastValue) {
                                            lastValue = result;
                                            callback(result);
                                        }
                                    }
                                }
                            };

                            exports.default = Form;

                            function addField(form, name) {
                                // Attempt to find the value in the state
                                var value = form.getStateValue(name),
                                    field = new _field2.default(name, value, form.$$q);

                                field.on('change', form.$onFieldChanged);
                                field.on('toggle', form.$onFieldChanged);
                                field.on('validate', form.$onFieldValidated);

                                return form.$$fields[name] = field;
                            }

                            function setStateValue(state, fieldName, value) {
                                var bits = fieldName.split('.'),
                                    root = getStateRoot(state, bits);

                                root[bits[bits.length - 1]] = value;
                            }

                            function getStateRoot(state, fieldComponents) {
                                var pos = 0,
                                    len = fieldComponents.length - 1;

                                // Ensure the hierarchy exists
                                while (pos < len) {
                                    var name = fieldComponents[pos++];
                                    state = !state.hasOwnProperty(name) ? state[name] = {} : state[name];

                                    if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) !== 'object' || state === null) throw new Error('attempting to overwrite existing non-object state property');
                                }

                                return state;
                            }

                            function isFormValid(form) {
                                var fields = form.$$fields;

                                for (var fieldName in fields) {
                                    if (fields.hasOwnProperty(fieldName)) {
                                        var field = fields[fieldName];
                                        if (!isFieldValid(field)) return false;
                                    }
                                }

                                return true;
                            }

                            function validateFormField(form, field) {
                                // Only validate fields that haven't been validated yet and are currently active.
                                // This saves on redundantly making expensive validation calls
                                if (field.isValidated() || !field.isActive() || !field.hasValidation()) {
                                    updateValidity(form, isFieldValid(field));
                                    return null;
                                }

                                ++form.validating;

                                return field.validate().then(function (valid) {
                                    --form.validating;
                                    updateValidity(form, valid);
                                });
                            }

                            function updateValidity(form, fieldValidity) {
                                if (!fieldValidity) form.valid = false;else if (!form.validating && !form.valid) form.valid = isFormValid(form);
                            }

                            function onFieldValidated(form, field) {
                                updateValidity(form, field.isValid());
                            }

                            function onFieldChanged(form, field) {
                                setStateValue(form.$$state, field.name, field.val());
                                if (form.$$validationTrigger === 'change') validateFormField(form, field);
                            }

                            function isFieldValid(field) {
                                return field.isValid() || !field.isActive() || !field.hasValidation();
                            }

                            /***/
                        },
                        /* 2 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            } : function (obj) {
                                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            };

                            exports.default = Field;

                            var _events = __webpack_require__(3);

                            var _events2 = _interopRequireDefault(_events);

                            function _interopRequireDefault(obj) {
                                return obj && obj.__esModule ? obj : { default: obj };
                            }

                            function Field(name, value, promise) {
                                _events2.default.call(this);

                                this.name = name;

                                // Internal variables
                                this.$$value = value;
                                this.$$active = true;
                                this.$$valid = true;
                                this.$$validated = false;
                                this.$$dirty = false;
                                this.$$errors = undefined;
                                this.$$validators = undefined;
                                this.$$asyncValidators = undefined;

                                // Async handling
                                this.$$deferredValidation = undefined;
                                this.$$deferredValue = undefined;
                                this.$$validationId = 0;
                                this.$$valueId = 0;
                                this.$$q = promise;
                            }

                            Field.prototype = Object.create(_events2.default.prototype, {
                                constructor: {
                                    value: Field,
                                    enumerable: false,
                                    writable: true,
                                    configurable: true
                                }
                            });

                            extend(Field.prototype, {
                                val: function val() {
                                    return this.$$active ? this.$$value : null;
                                },

                                off: function off(type, listener) {
                                    return this.removeListener(type, listener);
                                },

                                setValue: function setValue(value) {
                                    var deferred;

                                    // Cache the current deferred value and clear it
                                    if (this.$$deferredValue) {
                                        deferred = this.$$deferredValue;
                                        this.$$deferredValue = null;
                                    }

                                    var updated = false,
                                        previousValue = this.$$value;

                                    if (value !== previousValue) updated = true;else {
                                        var type = getType(value);
                                        updated = type === 'object' || type === 'array';
                                    }

                                    if (updated) {
                                        this.$$value = value;
                                        this.setDirty(true);
                                    }

                                    this.emit('change', this, value, previousValue);

                                    // Resolve the pending promise if needed
                                    if (deferred) deferred.resolve(value);
                                },

                                setValueAsync: function setValueAsync(future) {
                                    if (!future || (typeof future === 'undefined' ? 'undefined' : _typeof(future)) !== 'object' || typeof future.then !== 'function') throw new TypeError('"future" must be a valid "then-able" promise');

                                    var ref = ++this.$$valueId,
                                        self = this;

                                    if (!self.$$deferredValue) self.$$deferredValue = self.$$q.defer();

                                    // Hook in to the future and update the value if it's still the 
                                    // latest update.
                                    future.then(function (value) {
                                        // setValue will clean up and resolve the deferred.
                                        if (ref === self.$$valueId) self.setValue(value);
                                    }, function (err) {
                                        if (ref === self.$$valueId && self.$$deferredValue) {
                                            var deferred = self.$$deferredValue;
                                            self.$$deferredValue = null;
                                            deferred.reject(err);
                                        }
                                    });

                                    return self.$$deferredValue.promise;
                                },

                                setDirty: function setDirty(dirty) {
                                    this.$$validated = false;
                                    this.$$errors = undefined;
                                    this.$$dirty = !!dirty;
                                },

                                setActive: function setActive(active) {
                                    this.$$active = active;
                                    this.emit('toggle', this, active);
                                },

                                invalidate: function invalidate() {
                                    this.$$validated = false;
                                },

                                isActive: function isActive() {
                                    return this.$$active;
                                },

                                isValid: function isValid() {
                                    return this.$$validated && this.$$valid;
                                },

                                isValidated: function isValidated() {
                                    return this.$$validated;
                                },

                                isDirty: function isDirty() {
                                    return this.$$dirty;
                                },

                                hasValidation: function hasValidation() {
                                    // Shortcut to allow callers to figure out if they need to call 'validate' at
                                    // all, as it can be a bit expensive and dealing with promises sucks.
                                    return this.$$validators && this.$$validators.length > 0 || this.$$asyncValidators && this.$$asyncValidators.length > 0;
                                },

                                getErrors: function getErrors() {
                                    return this.$$errors;
                                },

                                addValidator: function addValidator(validator) {
                                    var key = validator.async ? '$$asyncValidators' : '$$validators';

                                    if (!this[key]) this[key] = [validator];else this[key].push(validator);
                                },

                                validate: function validate() {
                                    var ref = ++this.$$validationId,
                                        self = this,
                                        label = this.label || labelise(this.name),
                                        errors = [];

                                    var promise = self.$$deferredValue ? self.$$deferredValue.promise.then(run) : run();

                                    // TODO: Explore the wisdom of doing this. The $$state property
                                    // isn't guaranteed by angular and may disappear in future versions
                                    // However it prevents more expensive promise chaining if (for example)
                                    // only synchronous validators are used (or no validators at all)
                                    if (promise.$$state.status !== 0) {
                                        completeValidation(self, promise.$$state.value, errors);
                                        return promise;
                                    }

                                    if (!self.$$deferredValidation) self.$$deferredValidation = self.$$q.defer();

                                    promise.then(function (valid) {
                                        // If the completed validation round is still the latest validation
                                        // round then update the field state, otherwise do nothing.
                                        if (ref === self.$$validationId) completeValidation(self, valid, errors);
                                    }, function (err) {
                                        if (ref === self.$$validationId) {
                                            var deferred = self.$$deferredValidation;
                                            self.$$deferredValidation = null;
                                            if (deferred) deferred.reject(err);
                                        }
                                    });

                                    return self.$$deferredValidation.promise;

                                    function appendError(err) {
                                        if (typeof err === 'string') err = err.replace('%field%', label);
                                        errors.push(err);
                                    }

                                    function run() {
                                        return processSyncValidators(self, appendError) || processAsyncValidators(self, appendError) || self.$$q.when(true);
                                    }
                                },

                                // --
                                // Value testers
                                // --
                                equals: function equals(value) {
                                    return _equals(this.val(), value);
                                },
                                matches: function matches(value) {
                                    return _matches(this.val(), value);
                                },
                                contains: function contains(value) {
                                    return _contains(this.val(), value);
                                },
                                anyMatch: function anyMatch(value) {
                                    return any(this.val(), value, _matches);
                                },
                                matchesAny: function matchesAny(value) {
                                    return any(value, this.val(), _matches);
                                },
                                allMatch: function allMatch(value) {
                                    return all(this.val(), value, _matches);
                                },
                                matchesAll: function matchesAll(value) {
                                    return all(value, this.val(), _matches);
                                },
                                anyEqual: function anyEqual(value) {
                                    return any(this.val(), value, _equals);
                                },
                                equalsAny: function equalsAny(value) {
                                    return any(value, this.val(), _equals);
                                },
                                allEqual: function allEqual(value) {
                                    return all(this.val(), value, _equals);
                                },
                                equalsAll: function equalsAll(value) {
                                    return all(value, this.val(), _equals);
                                },
                                anyContain: function anyContain(value) {
                                    return any(this.val(), value, _contains);
                                },
                                containsAny: function containsAny(value) {
                                    return any(value, this.val(), _contains);
                                },
                                allContain: function allContain(value) {
                                    return all(this.val(), value, _contains);
                                },
                                containsAll: function containsAll(value) {
                                    return all(value, this.val(), _contains);
                                },

                                empty: function empty() {
                                    return _empty(this.val());
                                }
                            });

                            // --
                            // Private functions
                            // --

                            function labelise(name) {
                                name = name.substring(name.lastIndexOf('.') + 1);

                                var label = name.replace(/([A-Z]+)/g, ' $1').replace(/\W+/g, ' ').replace(/\s{2,}/g, ' ');

                                return label[0].toUpperCase() + label.substring(1);
                            }

                            function extend(target, source) {
                                var keys = Object.keys(source),
                                    k = keys.length;
                                while (--k >= 0) {
                                    target[keys[k]] = source[keys[k]];
                                }return target;
                            }

                            function completeValidation(field, valid, errors) {
                                var previous = field.$$valid,
                                    deferred = field.$$deferredValidation;

                                field.$$valid = valid;
                                field.$$errors = errors;
                                field.$$deferredValidation = null;
                                field.$$validated = true;

                                // Emit the event and then resolve the promise.
                                // This could be a bit racy.
                                field.emit('validate', field, previous);
                                if (deferred) deferred.resolve(valid);
                            }

                            function processSyncValidators(field, appendError) {
                                var promise = null;

                                if (field.$$validators && field.$$validators.length > 0) {
                                    for (var i = 0, j = field.$$validators.length; i < j; ++i) {
                                        if (!field.$$validators[i](field, appendError)) {
                                            promise = field.$$q.when(false);
                                            break;
                                        }
                                    }
                                }

                                return promise;
                            }

                            function processAsyncValidators(field, appendError) {
                                if (!field.$$asyncValidators || field.$$asyncValidators.length === 0) return null;

                                var promises = field.$$asyncValidators.map(function (validator) {
                                    return validator(field, appendError);
                                });

                                return field.$$q.all(promises).then(function (results) {
                                    for (var i = 0, j = results.length; i < j; ++i) {
                                        if (results[i] !== true) return false;
                                    }

                                    return true;
                                });
                            }

                            function getType(obj) {
                                var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
                                switch (type) {
                                    case 'object':
                                        if (obj === null) return 'null';
                                        if (Array.isArray(obj)) return 'array';
                                        if (obj instanceof RegExp) return 'regexp';
                                        if (obj instanceof Date) return 'date';
                                    default:
                                        return type;
                                }
                            }

                            function _empty(obj) {
                                if (obj === null || typeof obj === 'undefined') return true;

                                var type = getType(obj);
                                switch (type) {
                                    case 'array':
                                    case 'string':
                                        return obj.length === 0;
                                    case 'date':
                                        return obj.getTime() === 0;
                                    case 'object':
                                        for (var prop in obj) {
                                            if (obj.hasOwnProperty(prop)) return false;
                                        }
                                        return true;
                                    default:
                                        // The empty case for other types is handled at the top of the fn (!obj)
                                        return false;
                                }
                            }

                            function _contains(target, value) {
                                switch (getType(target)) {
                                    case 'string':
                                        return target.indexOf(value) >= 0;
                                    case 'object':
                                        return target.hasOwnProperty(value);
                                    case 'array':
                                        return target.some(function (v) {
                                            return _equals(v, value);
                                        });
                                    default:
                                        // No 'contains' method makes sense, return false.
                                        return false;
                                }
                            }

                            function _matches(target, to) {
                                switch (getType(to)) {
                                    case 'null':
                                    case 'undefined':
                                        return target === to;
                                    case 'regexp':
                                        return to.test(target);
                                    case 'array':
                                        if (!Array.isArray(target) || target.length < to.length || to.length === 0 && target.length !== 0) return false;

                                        for (var i = 0, j = to.length; i < j; ++i) {
                                            for (var ii = 0, jj = target.length; ii < jj; ++ii) {
                                                if (_matches(target[ii], to[i])) break;else if (ii == jj - 1) return false;
                                            }
                                        }

                                        return true;
                                    case 'object':
                                        var keys = Object.keys(to),
                                            k = keys.length,
                                            key;

                                        while (--k >= 0) {
                                            key = keys[k];
                                            if (!target.hasOwnProperty(key) || !_matches(target[key], to[key])) return false;
                                        }

                                        return true;
                                    case 'string':
                                    case 'number':
                                    case 'boolean':
                                    default:
                                        // todo: look at a way to implement configurable strict/loose checking.
                                        // loose checking is useful because a lot of the UI layer always gives back strings,
                                        // but there are probably times when strict checking will be required.
                                        return target == to;
                                }
                            }

                            function _equals(target, to) {
                                switch (getType(to)) {
                                    case 'null':
                                    case 'undefined':
                                        return target === to;
                                    case 'array':
                                        if (!Array.isArray(target) || target.length !== to.length) return false;

                                        for (var i = to.length - 1; i >= 0; --i) {
                                            if (!_equals(target[i], to[i])) return false;
                                        }

                                        return true;
                                    case 'object':
                                        var k1 = Object.keys(target),
                                            k2 = Object.keys(to);

                                        if (k1.length !== k2.length) return false;

                                        var k = k2.length,
                                            key;

                                        while (--k >= 0) {
                                            key = k2[k];
                                            if (!target.hasOwnProperty(key) || !_equals(target[key], to[key])) return false;
                                        }

                                        return true;
                                    case 'string':
                                    case 'number':
                                    case 'boolean':
                                    default:
                                        // todo: look at a way to implement configurable strict/loose checking.
                                        // loose checking is useful because a lot of the UI layer always gives back strings,
                                        // but there are probably times when strict checking will be required.
                                        return target == to;
                                }
                            }

                            function any(targets, to, comparator) {
                                if (!Array.isArray(targets) || targets.length === 0) return false;

                                for (var i = targets.length - 1; i >= 0; --i) {
                                    if (comparator(targets[i], to)) return true;
                                }

                                return false;
                            }

                            function all(targets, to, comparator) {
                                if (!Array.isArray(targets) || targets.length === 0) return false;

                                for (var i = targets.length - 1; i >= 0; --i) {
                                    if (!comparator(targets[i], to)) return false;
                                }

                                return true;
                            }

                            /***/
                        },
                        /* 3 */
                        /***/function (module, exports) {

                            // Copyright Joyent, Inc. and other Node contributors.
                            //
                            // Permission is hereby granted, free of charge, to any person obtaining a
                            // copy of this software and associated documentation files (the
                            // "Software"), to deal in the Software without restriction, including
                            // without limitation the rights to use, copy, modify, merge, publish,
                            // distribute, sublicense, and/or sell copies of the Software, and to permit
                            // persons to whom the Software is furnished to do so, subject to the
                            // following conditions:
                            //
                            // The above copyright notice and this permission notice shall be included
                            // in all copies or substantial portions of the Software.
                            //
                            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
                            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
                            // USE OR OTHER DEALINGS IN THE SOFTWARE.

                            function EventEmitter() {
                                this._events = this._events || {};
                                this._maxListeners = this._maxListeners || undefined;
                            }
                            module.exports = EventEmitter;

                            // Backwards-compat with node 0.10.x
                            EventEmitter.EventEmitter = EventEmitter;

                            EventEmitter.prototype._events = undefined;
                            EventEmitter.prototype._maxListeners = undefined;

                            // By default EventEmitters will print a warning if more than 10 listeners are
                            // added to it. This is a useful default which helps finding memory leaks.
                            EventEmitter.defaultMaxListeners = 10;

                            // Obviously not all Emitters should be limited to 10. This function allows
                            // that to be increased. Set to zero for unlimited.
                            EventEmitter.prototype.setMaxListeners = function (n) {
                                if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
                                this._maxListeners = n;
                                return this;
                            };

                            EventEmitter.prototype.emit = function (type) {
                                var er, handler, len, args, i, listeners;

                                if (!this._events) this._events = {};

                                // If there is no 'error' event listener then throw.
                                if (type === 'error') {
                                    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
                                        er = arguments[1];
                                        if (er instanceof Error) {
                                            throw er; // Unhandled 'error' event
                                        } else {
                                            // At least give some kind of context to the user
                                            var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
                                            err.context = er;
                                            throw err;
                                        }
                                    }
                                }

                                handler = this._events[type];

                                if (isUndefined(handler)) return false;

                                if (isFunction(handler)) {
                                    switch (arguments.length) {
                                        // fast cases
                                        case 1:
                                            handler.call(this);
                                            break;
                                        case 2:
                                            handler.call(this, arguments[1]);
                                            break;
                                        case 3:
                                            handler.call(this, arguments[1], arguments[2]);
                                            break;
                                        // slower
                                        default:
                                            args = Array.prototype.slice.call(arguments, 1);
                                            handler.apply(this, args);
                                    }
                                } else if (isObject(handler)) {
                                    args = Array.prototype.slice.call(arguments, 1);
                                    listeners = handler.slice();
                                    len = listeners.length;
                                    for (i = 0; i < len; i++) {
                                        listeners[i].apply(this, args);
                                    }
                                }

                                return true;
                            };

                            EventEmitter.prototype.addListener = function (type, listener) {
                                var m;

                                if (!isFunction(listener)) throw TypeError('listener must be a function');

                                if (!this._events) this._events = {};

                                // To avoid recursion in the case that type === "newListener"! Before
                                // adding it to the listeners, first emit "newListener".
                                if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

                                if (!this._events[type])
                                    // Optimize the case of one listener. Don't need the extra array object.
                                    this._events[type] = listener;else if (isObject(this._events[type]))
                                    // If we've already got an array, just append.
                                    this._events[type].push(listener);else
                                    // Adding the second element, need to change to array.
                                    this._events[type] = [this._events[type], listener];

                                // Check for listener leak
                                if (isObject(this._events[type]) && !this._events[type].warned) {
                                    if (!isUndefined(this._maxListeners)) {
                                        m = this._maxListeners;
                                    } else {
                                        m = EventEmitter.defaultMaxListeners;
                                    }

                                    if (m && m > 0 && this._events[type].length > m) {
                                        this._events[type].warned = true;
                                        console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
                                        if (typeof console.trace === 'function') {
                                            // not supported in IE 10
                                            console.trace();
                                        }
                                    }
                                }

                                return this;
                            };

                            EventEmitter.prototype.on = EventEmitter.prototype.addListener;

                            EventEmitter.prototype.once = function (type, listener) {
                                if (!isFunction(listener)) throw TypeError('listener must be a function');

                                var fired = false;

                                function g() {
                                    this.removeListener(type, g);

                                    if (!fired) {
                                        fired = true;
                                        listener.apply(this, arguments);
                                    }
                                }

                                g.listener = listener;
                                this.on(type, g);

                                return this;
                            };

                            // emits a 'removeListener' event iff the listener was removed
                            EventEmitter.prototype.removeListener = function (type, listener) {
                                var list, position, length, i;

                                if (!isFunction(listener)) throw TypeError('listener must be a function');

                                if (!this._events || !this._events[type]) return this;

                                list = this._events[type];
                                length = list.length;
                                position = -1;

                                if (list === listener || isFunction(list.listener) && list.listener === listener) {
                                    delete this._events[type];
                                    if (this._events.removeListener) this.emit('removeListener', type, listener);
                                } else if (isObject(list)) {
                                    for (i = length; i-- > 0;) {
                                        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
                                            position = i;
                                            break;
                                        }
                                    }

                                    if (position < 0) return this;

                                    if (list.length === 1) {
                                        list.length = 0;
                                        delete this._events[type];
                                    } else {
                                        list.splice(position, 1);
                                    }

                                    if (this._events.removeListener) this.emit('removeListener', type, listener);
                                }

                                return this;
                            };

                            EventEmitter.prototype.removeAllListeners = function (type) {
                                var key, listeners;

                                if (!this._events) return this;

                                // not listening for removeListener, no need to emit
                                if (!this._events.removeListener) {
                                    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
                                    return this;
                                }

                                // emit removeListener for all listeners on all events
                                if (arguments.length === 0) {
                                    for (key in this._events) {
                                        if (key === 'removeListener') continue;
                                        this.removeAllListeners(key);
                                    }
                                    this.removeAllListeners('removeListener');
                                    this._events = {};
                                    return this;
                                }

                                listeners = this._events[type];

                                if (isFunction(listeners)) {
                                    this.removeListener(type, listeners);
                                } else if (listeners) {
                                    // LIFO order
                                    while (listeners.length) {
                                        this.removeListener(type, listeners[listeners.length - 1]);
                                    }
                                }
                                delete this._events[type];

                                return this;
                            };

                            EventEmitter.prototype.listeners = function (type) {
                                var ret;
                                if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
                                return ret;
                            };

                            EventEmitter.prototype.listenerCount = function (type) {
                                if (this._events) {
                                    var evlistener = this._events[type];

                                    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
                                }
                                return 0;
                            };

                            EventEmitter.listenerCount = function (emitter, type) {
                                return emitter.listenerCount(type);
                            };

                            function isFunction(arg) {
                                return typeof arg === 'function';
                            }

                            function isNumber(arg) {
                                return typeof arg === 'number';
                            }

                            function isObject(arg) {
                                return (typeof arg === 'undefined' ? 'undefined' : _typeof2(arg)) === 'object' && arg !== null;
                            }

                            function isUndefined(arg) {
                                return arg === void 0;
                            }

                            /***/
                        },
                        /* 4 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.ValidatorFactoryProvider = ValidatorFactoryProvider;
                            function ValidatorFactoryProvider() {
                                var validators = {};

                                this.register = function (name, isAsync, validatorFn) {
                                    if (validators.hasOwnProperty(name)) console.warn('overwriting previously registered validator "' + name + '"');

                                    if (!validatorFn && typeof isAsync === 'function') {
                                        validatorFn = isAsync;
                                        isAsync = false;
                                    }

                                    validators[name] = { 'async': !!isAsync, 'name': name, 'fn': validatorFn };
                                    return this;
                                };

                                this.$get = function () {
                                    return function (name) {
                                        return validators[name] || null;
                                    };
                                };
                            };

                            /***/
                        },
                        /* 5 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _dynamicForm = __webpack_require__(6);

                            Object.keys(_dynamicForm).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _dynamicForm[key];
                                    }
                                });
                            });

                            var _fieldModel = __webpack_require__(7);

                            Object.keys(_fieldModel).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldModel[key];
                                    }
                                });
                            });

                            var _fieldMultiModel = __webpack_require__(8);

                            Object.keys(_fieldMultiModel).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldMultiModel[key];
                                    }
                                });
                            });

                            var _fieldValidationFor = __webpack_require__(9);

                            Object.keys(_fieldValidationFor).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldValidationFor[key];
                                    }
                                });
                            });

                            var _fieldValidationMessagesFor = __webpack_require__(10);

                            Object.keys(_fieldValidationMessagesFor).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldValidationMessagesFor[key];
                                    }
                                });
                            });

                            var _fieldValidationMessageFor = __webpack_require__(11);

                            Object.keys(_fieldValidationMessageFor).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldValidationMessageFor[key];
                                    }
                                });
                            });

                            var _fieldCondition = __webpack_require__(12);

                            Object.keys(_fieldCondition).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldCondition[key];
                                    }
                                });
                            });

                            var _fieldConditionFor = __webpack_require__(13);

                            Object.keys(_fieldConditionFor).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _fieldConditionFor[key];
                                    }
                                });
                            });

                            var _multiFieldConditionFor = __webpack_require__(14);

                            Object.keys(_multiFieldConditionFor).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _multiFieldConditionFor[key];
                                    }
                                });
                            });

                            /***/
                        },
                        /* 6 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.DynamicFormDirective = DynamicFormDirective;
                            function DynamicFormDirective() {}

                            DynamicFormDirective.prototype = {
                                restrict: 'A',
                                scope: { form: '=dynamicForm' },
                                controller: ['$scope', function (scope) {
                                    if (!scope.form) throw new TypeError('dynamic-form: invalid form specified');
                                    this.form = scope.form;
                                }]
                            };

                            /***/
                        },
                        /* 7 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.FieldModelDirective = FieldModelDirective;
                            function FieldModelDirective() {}

                            FieldModelDirective.prototype = {
                                restrict: 'A',
                                require: ['^^dynamicForm', 'ngModel'],
                                link: function link(scope, $element, attrs, ctrls) {
                                    if (!attrs['fieldModel']) throw new TypeError('form-model: missing required attribute "field-model"');

                                    var field = ctrls[0].form.getField(attrs['fieldModel']),
                                        modelController = ctrls[1];

                                    // Override model controller methods     
                                    var commitViewValue = modelController.$commitViewValue,
                                        render = modelController.$render;

                                    // Set up change handlers and update the UI
                                    field.on('change', onUpdate);
                                    onUpdate();

                                    modelController.$render = function () {
                                        var value = this.$modelValue || this.$viewValue;
                                        if (value || modelController.$dirty) field.setValue(value);
                                        return render.call(this);
                                    };

                                    modelController.$commitViewValue = function () {
                                        var result = commitViewValue.call(this);
                                        field.setValue(this.$modelValue || this.$viewValue);
                                        return result;
                                    };

                                    function onUpdate() {
                                        var uiValue = modelController.$modelValue || modelController.$viewValue,
                                            modelValue = field.val();

                                        if (uiValue !== modelValue) {
                                            modelController.$viewValue = modelValue;
                                            // Make sure to call the original functions to avoid infinitely recursing.
                                            commitViewValue.call(modelController);
                                            render.call(modelController);
                                        }
                                    }
                                }
                            };

                            /***/
                        },
                        /* 8 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            } : function (obj) {
                                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            };

                            exports.FieldMultiModelDirective = FieldMultiModelDirective;
                            function FieldMultiModelDirective(parse) {
                                this.parse = parse;
                            }

                            FieldMultiModelDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                dependencies: ['$parse'],
                                link: function link(scope, $element, attrs, formController) {
                                    if (!attrs['fieldMultiModel'] || !attrs['value'] && !attrs['ngValue']) throw new TypeError('form-multi-model: missing required attribute "' + (!attrs['fieldMultiModel'] ? 'field-multi-model' : 'value') + '"');

                                    var field = formController.form.getField(attrs['fieldMultiModel']),
                                        element = $element.get(0),
                                        allowMultiple = attrs['type'] === 'checkbox';

                                    var trackBy = attrs['trackBy'];
                                    var value = attrs['ngValue'] ? this.parse(attrs['ngValue'])(scope, formController.form.$$fields) : attrs['value'];

                                    $element.on('change', function () {
                                        if (allowMultiple || this.checked) scope.$apply(processChange);
                                    });

                                    var unbindChange = field.on('change', onUpdate),
                                        unbindToggle = field.on('toggle', onUpdate);

                                    // Remove all listeners once the directive is destroyed.
                                    this.$onDestroy = function () {
                                        unbindChange();
                                        unbindToggle();
                                    };

                                    onUpdate(field);

                                    function processChange() {
                                        if (!allowMultiple) return field.setValue(value);

                                        var model = field.val();
                                        var idx = -1;

                                        if (!Array.isArray(model)) model = model ? [model] : [];

                                        for (var i = 0, j = model.length; i < j; ++i) {
                                            if (compareValues(model[i])) {
                                                idx = i;
                                                break;
                                            }
                                        }

                                        if (element.checked && idx < 0) {
                                            model.push(value);
                                            field.setValue(model);
                                        } else if (!element.checked && idx >= 0) {
                                            model.splice(idx, 1);
                                            field.setValue(model);
                                        }
                                    }

                                    function onUpdate(field) {
                                        var modelValue = field.val();
                                        var shouldBeChecked = !Array.isArray(modelValue) && compareValues(modelValue) || Array.isArray(modelValue) && modelValue.some(compareValues);

                                        if (element.checked !== shouldBeChecked) element.checked = shouldBeChecked;
                                    }

                                    function compareValues(modelValue) {
                                        if (!trackBy) return modelValue == value;

                                        return modelValue && value && (typeof modelValue === 'undefined' ? 'undefined' : _typeof(modelValue)) === (typeof value === 'undefined' ? 'undefined' : _typeof(value)) && modelValue.hasOwnProperty(trackBy) && value.hasOwnProperty(trackBy) && modelValue[trackBy] == value[trackBy];
                                    }
                                }
                            };

                            /***/
                        },
                        /* 9 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            } : function (obj) {
                                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
                            };

                            exports.FieldValidationForDirective = FieldValidationForDirective;
                            var INVALID_CLASS = 'df-invalid';
                            var VALID_CLASS = 'df-valid';

                            function FieldValidationForDirective(validatorFactory) {
                                this.validatorFactory = validatorFactory;
                            }

                            FieldValidationForDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                dependencies: ['ValidatorFactory'],

                                link: function link(scope, $element, attrs, formCtrl) {
                                    if (!attrs['fieldValidationFor']) throw new TypeError('validation-form: missing required attribute "field-validation-for"');

                                    var fields = attrs['fieldValidationFor'].split(',').map(function (name) {
                                        return formCtrl.form.getField(name);
                                    }),
                                        validatorFactory = this.validatorFactory;

                                    var invalidClass = attrs['invalidClass'] || INVALID_CLASS,
                                        validClass = attrs['validClass'] || VALID_CLASS;

                                    // If validators are specified, grab them
                                    if (attrs.hasOwnProperty('validators')) {
                                        var off = scope.$watch(attrs['validators'], function (n, o) {
                                            // Wait until the value stabilizes and then use it.
                                            if (typeof n !== 'undefined') {
                                                off();
                                                initialise(fields, n, validatorFactory);
                                            }
                                        });
                                    }

                                    var unbinders = [];

                                    for (var i = 0, j = fields.length; i < j; ++i) {
                                        var field = fields[i];
                                        unbinders.push(field.on('validate', onUpdated));
                                        unbinders.push(field.on('change', onUpdated));
                                    }

                                    // Remove all listeners once the directive is destroyed.
                                    this.$onDestroy = function () {
                                        for (var i = 0, j = unbinders.length; i < j; ++i) {
                                            unbinders[i]();
                                        }
                                    };

                                    onUpdated();

                                    function onUpdated() {
                                        var valid = fields.every(function (f) {
                                            return f.isValid();
                                        }),
                                            validated = fields.every(function (f) {
                                            return f.isValidated();
                                        });

                                        $element[validated && valid ? 'addClass' : 'removeClass'](validClass);
                                        $element[validated && !valid ? 'addClass' : 'removeClass'](invalidClass);
                                    }
                                }
                            };

                            function initialise(fields, metadata, factory) {
                                var validators = Array.isArray(metadata) ? metadata.map(function (m) {
                                    return createValidator(m, factory);
                                }) : [createValidator(metadata, factory)];

                                for (var i = 0, j = fields.length; i < j; ++i) {
                                    var field = fields[i];

                                    for (var k = 0, l = validators.length; k < l; ++k) {
                                        field.addValidator(validators[k]);
                                    }
                                }
                            }

                            function createValidator(obj, validatorFactory) {
                                var args = null,
                                    validator;

                                if (typeof obj === 'string') validator = validatorFactory(obj);else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || !obj.hasOwnProperty('name')) throw new TypeError('validation-for: invalid validator encountered: ' + JSON.stringify(obj));else {
                                    validator = validatorFactory(obj.name);
                                    args = obj;
                                }

                                if (!validator) throw new TypeError('validation-for: unknown validator "' + (obj.name || obj) + '"');

                                validate.async = validator.async;
                                return validate;

                                function validate(field, addError) {
                                    return validator.fn.call(validator, field, addError, args);
                                };
                            }

                            /***/
                        },
                        /* 10 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.FieldValidationMessagesForDirective = FieldValidationMessagesForDirective;
                            function FieldValidationMessagesForDirective() {}

                            FieldValidationMessagesForDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                template: '<ul><li ng-repeat="error in errors" ng-bind="::error"></li></ul>',
                                scope: {},
                                link: function link(scope, $element, attrs, formCtrl) {
                                    if (!attrs['fieldValidationMessagesFor']) throw new TypeError('field-validation-messages-for: missing required attribute "field-validation-messages-for"');

                                    var field = formCtrl.form.getField(attrs['fieldValidationMessagesFor']);

                                    var unbindValidate = field.on('validate', onUpdated),
                                        unbindChange = field.on('change', onUpdated);

                                    this.$onDestroy = function () {
                                        unbindValidate();
                                        unbindChange();
                                    };

                                    onUpdated(field);

                                    function onUpdated(f) {
                                        scope.errors = f.getErrors();
                                        $element[scope.errors ? 'show' : 'hide']();
                                    }
                                }
                            };

                            /***/
                        },
                        /* 11 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.FieldValidationMessageForDirective = FieldValidationMessageForDirective;
                            function FieldValidationMessageForDirective() {}

                            FieldValidationMessageForDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                template: '<span ng-bind="error"></span>',
                                scope: {},
                                link: function link(scope, $element, attrs, formCtrl) {
                                    if (!attrs['fieldValidationMessageFor']) throw new TypeError('field-validation-message-for: missing required attribute "field-validation-message-for"');

                                    var field = formCtrl.form.getField(attrs['fieldValidationMessageFor']);

                                    var unbindValidate = field.on('validate', onUpdated),
                                        unbindChange = field.on('change', onUpdated);

                                    this.$onDestroy = function () {
                                        unbindValidate();
                                        unbindChange();
                                    };

                                    onUpdated(field);

                                    function onUpdated(f) {
                                        var errors = f.getErrors();
                                        scope.error = errors ? errors[0] : null;
                                        $element[scope.error ? 'show' : 'hide']();
                                    }
                                }
                            };

                            /***/
                        },
                        /* 12 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.FieldConditionDirective = FieldConditionDirective;
                            function FieldConditionDirective() {}

                            FieldConditionDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                link: function link(scope, $element, attrs, formCtrl) {
                                    if (!attrs['fieldCondition']) throw new TypeError('field-condition: must specify a valid condition');

                                    var speed = parseInt(attrs['speed'], 10);
                                    if (isNaN(speed)) speed = 300;

                                    var off = formCtrl.form.addCondition(attrs['fieldCondition'], scope, function (active) {
                                        active ? $element.show(speed) : $element.hide();
                                    });

                                    // When destroyed, release the condition
                                    this.$onDestroy = off;
                                }
                            };

                            /***/
                        },
                        /* 13 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.FieldConditionForDirective = FieldConditionForDirective;
                            function FieldConditionForDirective() {}

                            FieldConditionForDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                link: function link(scope, $element, attrs, formCtrl) {
                                    if (!attrs['fieldConditionFor'] || !attrs['condition']) throw new TypeError('field-condition-for: missing required attribute "' + (attrs['condition'] ? 'field-condition-for' : 'condition') + '"');

                                    var speed = parseInt(attrs['speed'], 10),
                                        field = formCtrl.form.getField(attrs['fieldConditionFor']);

                                    if (isNaN(speed)) speed = 300;

                                    var off = formCtrl.form.addCondition(attrs['condition'], scope, function (active) {
                                        field.setActive(active);
                                        active ? $element.show(speed) : $element.hide();
                                    });

                                    // When destroyed, release the condition
                                    this.$onDestroy = off;
                                }
                            };

                            /***/
                        },
                        /* 14 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.MultiFieldConditionForDirective = MultiFieldConditionForDirective;
                            function MultiFieldConditionForDirective() {}

                            MultiFieldConditionForDirective.prototype = {
                                restrict: 'A',
                                require: '^^dynamicForm',
                                link: function link(scope, $element, attrs, formCtrl) {
                                    if (!attrs['multiFieldConditionFor'] || !attrs['condition']) throw new TypeError('multi-field-condition-for: missing required attribute "' + (attrs['condition'] ? 'multi-field-condition-for' : 'condition') + '"');

                                    var speed = parseInt(attrs['speed'], 10) || 300,
                                        fieldNames = scope.$eval(attrs['multiFieldConditionFor']),
                                        fields = fieldNames.map(function (n) {
                                        return formCtrl.form.getField(n);
                                    });

                                    var off = formCtrl.form.addCondition(attrs['condition'], function (active) {
                                        fields.forEach(function (f) {
                                            return f.setActive(active);
                                        });
                                        active ? $element.show(speed) : $element.hide();
                                    });

                                    // When destroyed, release the condition
                                    this.$onDestroy = off;
                                }
                            };

                            /***/
                        },
                        /* 15 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });

                            var _required = __webpack_require__(16);

                            Object.keys(_required).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _required[key];
                                    }
                                });
                            });

                            var _numeric = __webpack_require__(17);

                            Object.keys(_numeric).forEach(function (key) {
                                if (key === "default" || key === "__esModule") return;
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: function get() {
                                        return _numeric[key];
                                    }
                                });
                            });

                            /***/
                        },
                        /* 16 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.RequiredValidator = RequiredValidator;
                            function RequiredValidator(field, addError, args) {
                                if (!field.empty()) return true;

                                addError(args && args.message ? args.message : '%field% is a required field.');
                                return false;
                            }

                            /***/
                        },
                        /* 17 */
                        /***/function (module, exports, __webpack_require__) {

                            "use strict";

                            Object.defineProperty(exports, "__esModule", {
                                value: true
                            });
                            exports.NumericValidator = NumericValidator;
                            function NumericValidator(field, addError) {
                                var n = field.val();

                                if (field.empty() || !isNaN(parseFloat(n)) && isFinite(n)) return true;

                                addError('%field% must be a valid number.');
                                return false;
                            }

                            /***/
                        }]
                        /******/)
                    );
                });
                /* WEBPACK VAR INJECTION */
            }).call(exports, __webpack_require__(2)(module));

            /***/
        },
        /* 2 */
        /***/function (module, exports) {

            module.exports = function (module) {
                if (!module.webpackPolyfill) {
                    module.deprecate = function () {};
                    module.paths = [];
                    // module.parent = undefined by default
                    if (!module.children) module.children = [];
                    Object.defineProperty(module, "loaded", {
                        enumerable: true,
                        get: function get() {
                            return module.l;
                        }
                    });
                    Object.defineProperty(module, "id", {
                        enumerable: true,
                        get: function get() {
                            return module.i;
                        }
                    });
                    module.webpackPolyfill = 1;
                }
                return module;
            };

            /***/
        }]
        /******/)
    );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});