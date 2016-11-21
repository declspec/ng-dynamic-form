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

        var field = formCtrl.form.getField(attrs['fieldValidationFor']),
            validatorFactory = this.validatorFactory;

        var invalidClass = attrs['invalidClass'] || INVALID_CLASS,
            validClass = attrs['validClass'] || VALID_CLASS;

        // If validators are specified, grab them
        if (attrs.hasOwnProperty('validators')) {
            var off = scope.$watch(attrs['validators'], (n, o) => {
                // Wait until the value stabilizes and then use it.
                if (typeof(n) !== 'undefined') {
                    off();
                    initialise(field, n, validatorFactory);
                }
            });
        }

        field.on('validate', onUpdated);
        field.on('change', onUpdated);

        onUpdated(field);

        function onUpdated(f) {
            let valid = f.isValid(),
                validated = f.isValidated();

            $element[validated && valid ? 'addClass' : 'removeClass'](validClass);
            $element[validated && !valid ? 'addClass' : 'removeClass'](invalidClass); 
        }
    }
};

function initialise(field, metadata, factory) {
    if (metadata && !Array.isArray(metadata))
        field.addValidator(createValidator(metadata, factory));
    else if (Array.isArray(metadata) && metadata.length > 0) {
        for(var i = 0, j = metadata.length; i < j; ++i) {
            field.addValidator(createValidator(metadata[i], factory));
        }
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
        args = obj.args || null;
    }

    if (!validator)
        throw new TypeError('validation-for: unknown validator "' + (obj.name || obj) + '"');

    validate.async = validator.async;
    return validate;

    function validate(field, addError) {
        return validator.fn.call(validator, field, addError, args);
    };
}