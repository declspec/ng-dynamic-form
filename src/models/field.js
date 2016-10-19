import EventEmitter from 'event-emitter';

function Field(name, value) {
    this.name = name;
    this.$$value = value;
    this.$$active = true;
}

Field.prototype = extend(EventEmitter.methods, {
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
});

export default Field;

function extend(target, source) {
    var keys = Object.keys(source);
    for(var k = keys.length-1; k >= 0; --k)
        target[keys[k]] = source[keys[k]];
    return target;
}

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