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

        this.$onFieldChanged = function(field, value) {
            onFieldChanged(self, field, value);
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
                var field = fields[fieldName],
                    promise = validateFormField(self, field);
                
                // validateFormField returns null when the field doesn't
                // require any sort of validation. 
                if (promise !== null)
                    promises.push(promise);
            }
        }

        // Wait for all the validation promises to run
        return this.$$q.all(promises).then(function(results) {
            return validateForm(self);
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
    field.on('change', form.$onFieldChanged);
    return (form.$$fields[name] = field);
}

function validateFormField(form, field) {
    // Only validate fields that haven't been validated yet and are currently active.
    // This saves on redundantly making expensive validation calls
    if (field.isValidated() || !field.isActive() || !field.hasValidation()) 
        return null;

    ++form.validating;

    return field.validate().then(function(valid) {
        --form.validating;
        
        if (!valid)
            form.valid = false;
        else if (!form.validating && !form.valid) 
            form.valid = validateForm(form);        
    });
}

function validateForm(form) {
    var fields = form.$$fields;
    
    for(var fieldName in fields) {
        if (fields.hasOwnProperty(fieldName)) {
            var field = fields[fieldName];
            if (field.isActive() && !field.isValid()) 
                return false;
        }            
    }

    return true;
}

function onFieldChanged(form, field, value) {
    validateFormField(form, field);
}
