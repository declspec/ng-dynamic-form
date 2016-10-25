function FormDirective() {}

FormDirective.prototype = {
    restrict: 'AE',
    scope: { form: '=' },
    controller: [ '$scope', 'ValidatorFactory', function($scope, validatorFactory) { 
        this.form = $scope.form;

        // todo: look at where else to put this. Doing it per-field directive
        // is a pain because each one needs to be injected with the validator factory
        this.createValidator = function(obj) {
            var args = null,
                validator;
 
            if (typeof(obj) === 'string') 
                validator = validatorFactory(obj);
            else if (typeof(obj) !== 'object' || !obj.hasOwnProperty('name')) 
                throw new TypeError('dynamic-form: invalid validator encountered: ' + JSON.stringify(obj));
            else {
                validator = validatorFactory(obj.name);
                args = obj.args || null;
            }

            if (!validator)
                throw new TypeError('dynamic-form: unknown validator "' + (obj.name || obj) + '"');

            validate.async = validator.async;
            return validate;

            function validate(field, addError) {
                return validator.fn.call(validator, field, addError, args);
            };
        };
    }],
};

export default FormDirective;