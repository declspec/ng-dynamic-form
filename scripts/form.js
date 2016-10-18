
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

// Inherit from the EventEmitter
inherits(DynamicFormField, EventEmitter);

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

    function any(field, check) {
        var current = field.getValue();
        if (Array.isArray(current)) {
            for(var i = 0, j = current.length; i < j; ++i) {
                if (check(current[i]))
                    return true;
            }
        }
        else if ('object' === typeof(current)) {
            for(var prop in current) {
                if (current.hasOwnProperty(prop) && check(current[prop]))
                    return true;
            }
        }

        return false;
    }

    function all(field, check) {
        var current = field.getValue();

        if (Array.isArray(current)) {
            for(var i = 0, j = current.length; i < j; ++i) {
                if (!check(current[i]))
                    return false;
            }
            return true;
        }
        else if ('object' === typeof(current)) {
            for(var prop in current) {
                if (current.hasOwnProperty(prop) && !check(current[prop]))
                    return false;
            }
            return true;
        }

        return false;
    }

    return {
        getValue: function() {
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
        // Value testers: Each are specific to data types
        // --
        in: function(array) {
            if (!Array.isArray(array))
                throw new TypeError('FormField::in(): parameter is not a valid array');

            var current = this.getValue();
            for(var i = 0, j = array.length; i < j; ++i) {
                if (array[i] == current)
                    return true;
            }
            return false;
        },

        empty: function() {
            var current = this.getValue();
            return !current || (Array.isArray(current) && current.length === 0);
        },

        equals: function(value) {
            var current = this.getValue();
            if (Array.isArray(current)) {
                if (!Array.isArray(value) || value.length !== current.length)
                    return false;
                
                for(var i = 0, j = current.length; i < j; ++i) {
                    if (current[i] != value[i])
                        return false;
                }

                return true;
            }
            else if ('object' === 

            return current == value;
        },

        like: function(regexp) {
            var current = this.getValue();
            return regexp.test(current);
        },

        anyEqual: function(value) {
            return any(this, function(val) {
                return val == value;
            });
        },

        anyLike: function(regexp) {
            return any(this, function(val) {
                return regexp.test(val);
            });
        }
        
        /*,

        appendValue: function(value) {
            if (Array.isArray(this.$$value))
                this.$$value.push(value);
            else {
                this.$$value = this.$$value 
                    ? [ this.$$value, value ]
                    : [ value ];
            }

            triggerValueChanged(this, this.$$value);
        },

        // todo: perf
        removeValue: function(value) {
            if (!Array.isArray(this.$$value) || this.$$value.length === 0)
                return;

            var removable = [];
            for(var i = 0, j = this.$$value.length; i < j; ++i) {
                if (this.$$value[i] == value)
                    removable.push(i);
            }

            for(var ii = 0, jj = removable.length; ii < jj; ++ii) {
                this.$$value.splice(removable[ii] - ii, 1);
            }
        }, 

        equals: function(value) {
            var current = this.$$value;
            return !Array.isArray(current) && current == value;
        },

        any: function(values) {
            var test = !Array.isArray(values)
                ? (arguments.length === 1 ? [ values ] : Array.prototype.slice.call(arguments))
                : values;

            if (test.length === 0)
                return true;

            for(var i = 0, j = 
        }*/
    };
}()));

function DynamicForm(state, parser) {
    this.$$fields = {};
    this.$$watchers = {};
    this.$$parser = parser;

    this.$init(state);
}

DynamicForm.prototype = (function() {
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
        onFieldChanged(form, field, field.getValue());
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
                        this.addField(prop, state[prop]);
                }   
            }
        },

        getField: function(name) {
            return this.$$fields.hasOwnProperty(name)
                ? this.$$fields[name]
                : (this.$$fields[name] = this.addField(name));
        },

        addField: function(name, value) {
            var field = new DynamicFormField(name, value);
            field.on('change', this.$onFieldChanged);
            field.on('toggle', this.$onFieldToggled);
            return field;
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