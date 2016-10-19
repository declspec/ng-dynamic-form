(function() {
    // Set up the angular module
    angular.module('dynamic-forms', [])
        .directive('dynamicForm', DynamicFormDirective)
        .directive('fieldModel', FieldModelDirective)
        .directive('fieldMultiModel', FieldMultiModelDirective)

        .directive('formFieldInput', FormFieldInputDirective)
        .directive('formFieldSelect', FormFieldSelectDirective)
        .directive('formFieldChecklist', FormFieldCheckListDirective)
        .directive('formFieldRadiolist', FormFieldRadioListDirective)
        .directive('formFieldReadonly', FormFieldReadonlyDirective)
        .directive('formFieldTextarea', FormFieldTextareaDirective);

    function inherit(target, parent) {
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

    // -- 
    // Backing form/field models
    // --

    // Inherit from the EventEmitter
    inherit(DynamicFormField, EventEmitter);

    function DynamicFormField(name, value) {
        EventEmitter.call(this);

        this.name = name;
        this.$$value = value;
        this.$$active = true;
    }

    extend(DynamicFormField.prototype, (function() {
        function triggerValueChanged(field, value) {
            field.emit('change', field, value);
        }

        function getType(obj) {
            var type = typeof(obj);
            switch(type) {
            case 'object':
                if (obj === null) return 'null'
                if (Array.isArray(obj)) return 'array';
                if (obj instanceof RegExp) return 'regexp';
                if (obj instanceof Date) return 'date';
            default:
                return type;
            }
        }

        function empty(obj) {
            if (!obj)
                return true;
            
            var type = getType(obj);
            switch(type) {
            case 'array':
                return obj.length === 0;
            case 'date':
                return obj.getTime() === 0;
            case 'object':
                for(var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        return false;
                }
                return true;
            default:
                // The empty case for other types is handled at the top of the fn (!obj)
                return false;
            }
        }

        function matches(target, to) {
            switch(getType(to)) {
            case 'null':
            case 'undefined':
                return target === to;
            case 'regexp':
                return to.test(target);
            case 'array':
                if (!Array.isArray(target))
                    return false;

                for(var i = 0, j = to.length; i < j; ++i) {
                    for(var ii = 0, jj = target.length; ii < jj; ++ii) {
                        if (matches(target[ii], to[i]))
                            break;
                        else if (ii == (jj-1))
                            return false;
                    }
                }

                return true;
            case 'object':
                var keys = Object.keys(to),
                    k = keys.length,
                    key;

                while(--k >= 0) {
                    key = keys[k];
                    if (!target.hasOwnProperty(key) || !matches(target[key], to[key]))
                        return false;
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

        function equals(target, to) {
            switch(getType(to)) {
            case 'null':
            case 'undefined':
                return target === to;
            case 'array':
                if (!Array.isArray(target) || target.length !== to.length)
                    return false;

                for(var i = to.length-1; i >= 0; --i) {
                    if (!equals(target[i], to[i]))
                        return false;
                }

                return true;
            case 'object':
                var k1 = Object.keys(target),
                    k2 = Object.keys(to);

                if (k1.length !== k2.length)
                    return false;

                var k = k2.length,
                    key;

                while(--k >= 0) {
                    key = k2[k];
                    if (!target.hasOwnProperty(key) || !equals(target[key], to[key]))
                        return false;
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
            if (!Array.isArray(targets) || targets.length === 0)
                return false;

            for(var i = targets.length-1; i >= 0; --i) {
                if (comparator(targets[i], to))
                    return true;
            }
            
            return false;
        }

        function all(targets, to, comparator) {
            if (!Array.isArray(targets) || targets.length === 0)
                return false;
            
            for(var i = targets.length-1; i >= 0; --i) {
                if (!comparator(targets[i], to))
                    return false;
            }

            return true;
        }

        return {
            val: function() {
                return this.$$active ? this.$$value : null;
            },

            setValue: function(value) {
                this.$$value = value;
                triggerValueChanged(this, value);
            },

            toggle: function(active) {
                this.$$active = active;
                this.emit('toggle', this, active);
            },

            clear: function() {
                this.$$value = null;
                triggerValueChanged(this, this.$$value);
            },
            
            // --
            // Value testers
            // --
            equals:     function(value) { return equals(this.val(), value); },
            matches:    function(value) { return matches(this.val(), value); },
            anyMatch:   function(value) { return any(this.val(), value, match); },
            matchesAny: function(value) { return any(value, this.val(), match); },
            allMatch:   function(value) { return all(this.val(), value, match); },
            matchesAll: function(value) { return all(value, this.val(), match); },
            anyEqual:   function(value) { return any(this.val(), value, equals); },
            equalsAny:  function(value) { return any(value, this.val(), equals); },
            allEqual:   function(value) { return all(this.val(), value, equals); },
            equalsAll:  function(value) { return all(value, this.val(), equals); },

            empty: function() {
                return empty(this.val());
            }
        };
    }()));

    function DynamicForm(state, parser) {
        this.$$fields = {};
        this.$$watchers = {};
        this.$$parser = parser;

        this.$init(state);
    }

    DynamicForm.prototype = (function() {
        function addField(form, name, value) {
            var field = new DynamicFormField(name, value);
            field.on('change', form.$onFieldChanged);
            field.on('toggle', form.$onFieldToggled);
            return (form.$$fields[name] = field);
        }

        function onFieldChanged(form, field, value) {
            form.state[field.name] = value;

            // This seems to be a little bit backwards as each field is an EventEmitter
            // so you could just subscribe via 'on' directly.
            // However, that would rely on the field already being created
            // at the time that another field requests to watch it, this way allows for
            // deferred field resolution.
            if (form.$$watchers.hasOwnProperty(field.name)) {
                var handlers = form.$$watchers[field.name];
                for(var i = 0, j = handlers.length; i < j; ++i) {
                    handlers[i](field);
                }
            }
        }

        function onFieldToggled(form, field, active) {
            // Fire off the onFieldChanged event handlers as once the
            // active state changes, other listeners will need to be re-run
            onFieldChanged(form, field, field.val());
        }

        return {
            $init: function(state) {
                var self = this;
                self.state = state || {};

                // Bind private functions
                this.$onFieldChanged = function(field, value) {
                    onFieldChanged(self, field, value);
                };

                this.$onFieldToggled = function(field, active) {
                    onFieldToggled(self, field, active);
                };

                // Initialise fields from state
                if (typeof(state) === 'object') {
                    for(var prop in state) {
                        if (state.hasOwnProperty(prop))
                            addField(this, prop, state[prop]);
                    }   
                }
            },

            getField: function(name) {
                return this.$$fields.hasOwnProperty(name)
                    ? this.$$fields[name]
                    : addField(this, name);
            },

            addCondition: function(condition, callback) {
                var dependentFields = [];
                // At this time there doesn't seem to be a way to extract the
                // variables out of a $parsed expression in order to know what
                // needs to be provided. Due to this we use our own special (stupid)
                // syntax to lightly sugar the expression (essentially just wrap all the field names in square brackets)
                var condition = condition.replace(/\[([a-zA-Z\$_]\w+)\]/g, function(m, fieldName) {
                    if (dependentFields.indexOf(fieldName) < 0)
                        dependentFields.push(fieldName);
                    return fieldName;
                });

                if (dependentFields.length === 0)
                    throw new Error('DynamicForm::addCondition(): conditional expression does not contain any field references');

                var parsedExpr = this.$$parser(condition),
                    fields = this.$$fields,
                    lastValue;

                var conditionalFn = function() {
                    var result = parsedExpr(fields) || false;
                    if (result !== lastValue) {
                        lastValue = result;
                        callback(result);
                    }
                };

                for(var i = 0, j = dependentFields.length; i < j; ++i) {
                    var fieldName = dependentFields[i];
                    if (!this.$$watchers.hasOwnProperty(fieldName))
                        this.$$watchers[fieldName] = [];
                    this.$$watchers[fieldName].push(conditionalFn);
                }

                // Run the condition once to initialise
                conditionalFn();
            },

            addFieldCondition: function(field, condition, callback) {
                return this.addCondition(condition, wrapped);

                function wrapped(status) {
                    field.toggle(status);
                    callback(status);
                }
            }
        }
    }());

    // --
    // Angular implementation
    // --

    // Field types
    function FieldBase() { };
    function FieldInput() { };
    function FieldReadonly() { };

    // Inheritance
    inherit(FieldInput, FieldBase);
    inherit(FieldReadonly, FieldBase);

    // Prototype chains
    // nb: use extend rather than direct assignment otherwise the previous 'inherits'
    // invocations will no longer point to the same prototype chain
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
            // Empty stub, can be overriden if needed
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

        scope.value = scope.field.val();
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
                    
                    var model = field.val();
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

    function FormFieldTextareaDirective() {
        var directive = new FieldBase();
        directive.templateUrl = 'templates/textarea.html';
        return directive;
    }
}());