import Field from './field';

function Form(initialState, parser, promise) {
    this.valid = true;

    this.$$fields = {};
    this.$$parser = parser;
    this.$$q = promise;

    this.$init(initialState);
}

Form.prototype = {
    $init: function(state) {
        var self = this;
        self.$$state = state || {};

        // Bind private functions
        this.$onFieldChanged = function(field, value) {
            onFieldChanged(self, field, value);
        };

        this.$onFieldToggled = function(field, active) {
            onFieldToggled(self, field, active);
        };

        this.$onFieldValidated = function(field, previouslyValid) {
            onFieldValidated(self, field, previouslyValid);
        };

        // Initialise fields from state
        if (typeof(state) === 'object') {
            for(var prop in state) {
                if (state.hasOwnProperty(prop))
                    addField(this, prop, state[prop]);
            }   
        }
    },

    valueOf: function(fieldName) {
        return this.$$state[fieldName];
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
            throw new Error('Form::addCondition(): conditional expression does not contain any field references');

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
            var field = this.getField(dependentFields[i]);
            field.on('toggle', conditionalFn);
            field.on('change', conditionalFn);
        }

        // Run the condition once to initialise
        conditionalFn();
    }
};

export default Form;

function addField(form, name, value) {
    var field = new Field(name, value, form.$$q);
    return (form.$$fields[name] = field);
}

function onFieldChanged(form, field, value) {
    form.$$state[field.name] = value;

    // This seems to be a little bit backwards as each field is an EventEmitter
    // so you could just subscribe via 'on' directly.
    // However, that would rely on either the field be created at the time this is run,
    // or creating
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

function onFieldValidated(form, field, previouslyValid) {
    if (!field.isValid())
        form.valid = false;
    else if (!previouslyValid && !form.valid) {
        // If the field is changing from invalid->valid then we need
        // to do a more exhaustive check to see if the whole form is
        // now in a valid state.
        var fields = form.$$fields,
            valid = true;

        for(var fieldName in fields) {
            if (fields.hasOwnProperty(fieldName) && !fields[fieldName].isValid()) {
                valid = false;
                break;
            }                
        }

        form.valid = valid;
    }
}