import Field from './field';

function Form(initialState, parser, promise) {
    this.valid = true;
    this.validating = 0;

    this.$$fields = {};
    this.$$parser = parser;
    this.$$q = promise;

    this.$init(initialState);
}

Form.prototype = {
    $init: function(state) {
        var self = this;
        self.$$state = state || {};

        this.$onFieldValidating = function(field) {
            onFieldValidating(self, field);
        };

        this.$onFieldValidated = function(field, previouslyValid, totalValidations) {
            onFieldValidated(self, field, previouslyValid, totalValidations);
        };

        // Initialise fields from state
        if (typeof(state) === 'object') {
            for(var prop in state) {
                if (state.hasOwnProperty(prop))
                    addField(this, prop, state[prop]);
            }   
        }
    },

    validate: function() {
        var promises = [],
            fields = this.$$fields,
            self = this;

        for(var fieldName in fields) {
            if (fields.hasOwnProperty(fieldName)) {
                var field = fields[fieldName];
                // Only validate fields that haven't been validated yet and are currently active.
                // This saves on redundantly making expensive validation calls
                if (!field.isValidated() && field.isActive() && field.hasValidation()) {
                    promises.push(fields[fieldName].validate());
                }
            }
        }

        // All validation has already run, just return an immediately resolved promise
        if (promises.length === 0)
            return this.$$q.when(self);

        // Wait for all the validation promises to run
        return this.$$q.all(promises).then(function() {
            return self;
        });
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
    field.on('validating', form.$onFieldValidating);
    field.on('validated', form.$onFieldValidated);
    return (form.$$fields[name] = field);
}

function onFieldValidating(form, field) {
    ++form.validating;
}

function onFieldValidated(form, field, previouslyValid, totalValidations) {
    // Due to async validators, the total number of 'validated' events does not always match
    // 1-1 with the number of 'validating' events, the totalValidations argument matches
    // the number of 'validating' events since the last 'validated' event.
    form.validating -= totalValidations;

    if (!field.isValid())
        form.valid = false;
    else if (!previouslyValid && !form.valid) {
        // If the field is changing from invalid->valid then we need
        // to do a more exhaustive check to see if the whole form is
        // now in a valid state.
        var fields = form.$$fields,
            valid = true;

        for(var fieldName in fields) {
            if (!fields.hasOwnProperty(fieldName))
                continue;
                
            var field = fields[fieldName];
            if (field.isActive() && !field.isValid()) {
                valid = false;
                break;
            }               
        }

        form.valid = valid;
    }
}