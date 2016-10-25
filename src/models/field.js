import EventEmitter from 'event-emitter';

function Field(name, value, promise) {
    this.name = name;

    // Internal variables
    this.$$value = value;
    this.$$active = true;
    this.$$valid = true;
    this.$$validated = false;
    this.$$errors = undefined;
    this.$$validators = undefined;
    this.$$asyncValidators = undefined;
    this.$$deferredValidation = undefined;
    this.$$runningValidations = 0;
    this.$$q = promise;
}

Field.prototype = extend(EventEmitter.methods, {
    val: function() {
        return this.$$active ? this.$$value : null;
    },

    setValue: function(value) {
        this.$$value = value;
        this.$$validated = false;
        this.emit('change', this, value);
    },

    setActive: function(active) {
        this.$$active = active;
        this.emit('toggle', this, active);
    },

    isActive: function() {
        return this.$$active;
    },

    isValid: function() {
        return (this.$$validated || !this.hasValidation()) && this.$$valid;
    },

    isValidated: function() {
        return this.$$validated;
    },

    hasValidation: function() {
        // Shortcut to allow callers to figure out if they need to call 'validate' at
        // all, as it can be a bit expensive and dealing with promises sucks.
        return (this.$$validators && this.$$validators.length > 0)
            || (this.$$asyncValidators && this.$$asyncValidators.length > 0);
    },

    getErrors: function() {
        return this.$$errors;
    },

    addValidator: function(validator) {
        var key = validator.async ? '$$asyncValidators' : '$$validators';

        if (!this[key])
            this[key] = [ validator ];
        else 
            this[key].push(validator);
    },

    validate: function() {
        var ref = ++this.$$runningValidations,
            self = this,
            errors = [];

        var promise = processSyncValidators(self, appendError) 
            || processAsyncValidators(self, appendError) 
            || self.$$q.when(true);

        // TODO: Explore the wisdom of doing this. The $$state property
        // isn't guaranteed by angular and may disappear in future versions
        // However it prevents more expensive promise chaining if (for example)
        // only synchronous validators are used (or no validators at all)
        if (promise.$$state.status !== 0) {
            completePromise(promise.$$state.value);
            return promise;
        }

        if (!self.$$deferredValidation)
            self.$$deferredValidation = self.$$q.defer();

        promise.then(function(valid) {
            // If the completed validation round is still the latest validation
            // round then update the field state, otherwise do nothing.
            if (ref === self.$$runningValidations) 
                completePromise(valid);        
        }, function(err) {
            if (ref === self.$$runningValidations)
                self.$$deferredValidation.reject(err);
        });

        return self.$$deferredValidation.promise;

        function appendError(err) {
            errors.push(err);
        }

        function completePromise(valid) {
            var previous = self.$$valid,
                deferred = self.$$deferredValidation;

            self.$$valid = valid;
            self.$$errors = errors;
            self.$$runningValidations = 0;
            self.$$deferredValidation = null;
            self.$$validated = true;
            
            // Emit the event and then resolve the promise.
            // This could be a bit racy.
            self.emit('validated', self, previous, ref);  
            if (deferred) deferred.resolve(valid);          
        }
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
});

export default Field;

function extend(target, source) {
    var keys = Object.keys(source);
    for(var k = keys.length-1; k >= 0; --k)
        target[keys[k]] = source[keys[k]];
    return target;
}

function processSyncValidators(field, appendError) {
    var promise = null;

    if (field.$$validators && field.$$validators.length > 0) {
        for(var i = 0, j = field.$$validators.length; i < j; ++i) {
            if (!field.$$validators[i](field, appendError)) {
                promise = field.$$q.when(false);
                break;
            }
        }
    }

    return promise;
}

function processAsyncValidators(field, appendError) {
    if (!field.$$asyncValidators || field.$$asyncValidators.length === 0) 
        return null;

    var promises = field.$$asyncValidators.map(function(validator) {
        return validator(field, appendError);
    });

    return field.$$q.all(promises).then(function(results) {
        for(var i = 0, j = results.length; i < j; ++i) {
            if (results[i] !== true)
                return false;
        }

        return true;
    });
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
        if (!Array.isArray(target) || target.length < to.length)
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