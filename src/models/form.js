import Field from './field';

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
    $init: function(state) {
        var self = this;

        // Create local bindings
        this.$onFieldChanged = function(field) {
            onFieldChanged(self, field);
        };

        this.$onFieldValidated = function(field, previouslyValid) {
            onFieldValidated(self, field, previouslyValid);
        };
    },

    validate: function() {
        var pendingValidations = [],
            fields = this.$$fields,
            self = this;

        for(var fieldName in fields) {
            if (fields.hasOwnProperty(fieldName)) {
                var field = fields[fieldName],
                    promise = validateFormField(self, field);
                
                // validateFormField returns null when the field doesn't
                // require any sort of validation. 
                if (promise !== null)
                    pendingValidations.push(promise);
            }
        }

        // Wait for all the validation promises to run
        return this.$$q.all(pendingValidations).then(function(results) {
            return self.valid;
        });
    },

    setFieldDependencies: function(fieldName, dependencyNames) {
        var field = this.getField(fieldName);
        var dependencies = Array.isArray(dependencyNames)
            ? dependencyNames.map(name => this.getField(name))
            : [ this.getField(dependencyNames) ];
        
        var listener = f => {
            field.invalidate();
            field.emit('change', field, field.val());
        };

        for(var i = 0, j = dependencies.length; i < j; ++i) {
            dependencies[i].on('change', listener);
            dependencies[i].on('toggle', listener);
        }
    },

    setValidationTrigger: function(trigger) {
        trigger = trigger || 'change';
        if (trigger !== 'change' && trigger !== 'manual')
            throw new Error(`Unexpected validation trigger encountered; expected one of "manual" or "change", got ${trigger}`);

        this.$$validationTrigger = trigger;
    },

    getState: function() {
        return this.$$state;
    },

    getStateValue: function(fieldName) {
        var bits = fieldName.split('.'),
            root = getStateRoot(this.$$state, bits);

        return root[bits[bits.length-1]];
    },

    valueOf: function(fieldName) {
        return this.$$fields.hasOwnProperty(fieldName)
            ? this.$$fields[fieldName].val()
            : undefined;
    },

    getField: function(name) {
        return this.$$fields.hasOwnProperty(name)
            ? this.$$fields[name]
            : addField(this, name);
    },

    getFields: function() {
        var fields = this.$$fields,
            arr = [];

        for(var fieldName in fields) {
            if (fields.hasOwnProperty(fieldName))
                arr.push(fields[fieldName]);
        }

        return arr;
    },

    hasDirtyFields: function() {
        var fields = this.$$fields,
            field;

        for(var fieldName in fields) {
            if (fields.hasOwnProperty(fieldName)) {
                field = fields[fieldName];
                if (field.isActive() && field.isDirty())
                    return true;
            }
        }

        return false;
    },

    setPristine: function() {
        var fields = this.$$fields;

        for(var fieldName in fields) {
            if (fields.hasOwnProperty(fieldName))
                fields[fieldName].setDirty(false);
        }
    },

    addCondition: function(condition, scope, callback) {
        if (!callback && typeof(scope) === 'function') {
            callback = scope;
            scope = null;
        }

        var dependentFields = [];
        // At this time there doesn't seem to be a way to extract the
        // variables out of a $parsed expression in order to know what
        // needs to be provided. Due to this we use our own special (stupid)
        // syntax to lightly sugar the expression (essentially just wrap all the field names in square brackets)
        var condition = condition.replace(/\[([a-zA-Z\$_][\w.]+)\]/g, function(m, fieldName) {
            if (dependentFields.indexOf(fieldName) < 0)
                dependentFields.push(fieldName);
            return fieldName;
        });

        if (dependentFields.length === 0)
            console.warn('Form::addCondition(): conditional expression does not contain any field references and will only be evaluated once');
            
        var parsedExpr = this.$$parser(condition),
            fields = this.$$fields,
            lastValue;

        for(var i = 0, j = dependentFields.length; i < j; ++i) {
            var field = this.getField(dependentFields[i]);
            
            field.on('toggle', checkCondition);
            field.on('change', checkCondition);
        }

        // Run the condition once to initialise
        checkCondition();

        // Return a function that can be called to remove the listeners
        return () => {
            for(var i = 0, j = dependentFields.length; i < j; ++i) {
                var field = this.getField(dependentFields[i]);
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

export default Form;

function addField(form, name) {
    // Attempt to find the value in the state
    var value = form.getStateValue(name),
        field = new Field(name, value, form.$$q);

    field.on('change', form.$onFieldChanged);
    field.on('toggle', form.$onFieldChanged);
    field.on('validate', form.$onFieldValidated);

    return (form.$$fields[name] = field);
}

function setStateValue(state, fieldName, value) {
    var bits = fieldName.split('.'),
        root = getStateRoot(state, bits);

    root[bits[bits.length-1]] = value;
}

function getStateRoot(state, fieldComponents) {
    var pos = 0,
        len = fieldComponents.length - 1;
    
    // Ensure the hierarchy exists
    while(pos < len) {
        var name = fieldComponents[pos++];
        state = !state.hasOwnProperty(name)
            ? (state[name] = {})
            : state[name];

        if (typeof(state) !== 'object' || state === null)
            throw new Error('attempting to overwrite existing non-object state property');
    }

    return state;
}

function isFormValid(form) {
    var fields = form.$$fields;
    
    for(var fieldName in fields) {
        if (fields.hasOwnProperty(fieldName)) {
            var field = fields[fieldName];
            if (!isFieldValid(field))
                return false;
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

    return field.validate().then(function(valid) {
        --form.validating;
        updateValidity(form, valid);    
    });
}

function updateValidity(form, fieldValidity) {
    if (!fieldValidity)
        form.valid = false;
    else if (!form.validating && !form.valid) 
        form.valid = isFormValid(form);    
}

function onFieldValidated(form, field) {
    updateValidity(form, field.isValid());
}

function onFieldChanged(form, field) {
    setStateValue(form.$$state, field.name, field.val());
    if (form.$$validationTrigger === 'change')
        validateFormField(form, field);
}

function isFieldValid(field) {
    return field.isValid() || !field.isActive() || !field.hasValidation()
}