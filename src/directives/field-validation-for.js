const INVALID_CLASS = 'df-invalid';
const VALID_CLASS   = 'df-valid';

export function FieldValidationForDirective(validatorFactory) { 
    this.validatorFactory = validatorFactory;
}

FieldValidationForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    dependencies: [ 'ValidatorFactory' ],
    
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldValidationFor'])
            throw new TypeError('validation-form: missing required attribute "field-validation-for"');

        var fields = attrs['fieldValidationFor'].split(',').map(name => formCtrl.form.getField(name)),
            validatorFactory = this.validatorFactory;

        var invalidClass = attrs['invalidClass'] || INVALID_CLASS,
            validClass = attrs['validClass'] || VALID_CLASS;

        // If validators are specified, grab them
        if (attrs.hasOwnProperty('validators')) {
            var off = scope.$watch(attrs['validators'], (n, o) => {
                // Wait until the value stabilizes and then use it.
                if (typeof(n) !== 'undefined') {
                    off();
                    initialise(fields, n, validatorFactory);
                }
            });
        }

        var unbinders = [];

        for(var i = 0, j = fields.length; i < j; ++i) {
            const field = fields[i]
            unbinders.push(field.on('validate', onUpdated));
            unbinders.push(field.on('change', onUpdated));
        }

        // Remove all listeners once the directive is destroyed.
        this.$onDestroy = () => {
            for(var i = 0, j = unbinders.length; i < j; ++i)
                unbinders[i]();
        };

        onUpdated();

        function onUpdated() {
            let valid = fields.every(f => f.isValid()),
                validated = fields.every(f => f.isValidated());

            $element[validated && valid ? 'addClass' : 'removeClass'](validClass);
            $element[validated && !valid ? 'addClass' : 'removeClass'](invalidClass); 
        }
    }
};

function initialise(fields, metadata, factory) {
    const validators = Array.isArray(metadata)
        ? metadata.map(m => createValidator(m, factory))
        : [ createValidator(metadata, factory) ];

    for(var i = 0, j = fields.length; i < j; ++i) {
        const field = fields[i];

        for(var k = 0, l = validators.length; k < l; ++k)
            field.addValidator(validators[k]);
    }
}

function createValidator(obj, validatorFactory) {
    var args = null,
        validator;

    if (typeof(obj) === 'string') 
        validator = validatorFactory(obj);
    else if (typeof(obj) !== 'object' || !obj.hasOwnProperty('name')) 
        throw new TypeError('validation-for: invalid validator encountered: ' + JSON.stringify(obj));
    else {
        validator = validatorFactory(obj.name);
        args = obj;
    }

    if (!validator)
        throw new TypeError('validation-for: unknown validator "' + (obj.name || obj) + '"');

    validate.async = validator.async;
    return validate;

    function validate(field, addError) {
        return validator.fn.call(validator, field, addError, args);
    };
}