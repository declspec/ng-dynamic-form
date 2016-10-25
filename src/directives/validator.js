function ValidatorDirective(validatorFactory) { 
    this.validatorFactory = validatorFactory;
};

ValidatorDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    link: function(scope, $element, attrs, formController) {
        if (!attrs['for'] || !attrs['validators'])
            throw new TypeError('validator: missing required attribute "' + (!attrs['for'] ? 'for' : 'validators') + '"');

        var validatorMetadata = scope.$eval(attrs['validators']),
            field = formController.form.getField(attrs['for']),
            self = this;

        if (validatorMetadata && !Array.isArray(validatorMetadata))
            field.addValidator(createValidator(validator));
        else if (Array.isArray(validatorMetadata) && validatorMetadata.length > 0) {
            for(var i = 0, j = validatorMetadata.length; i < j; ++i) {
                field.addValidator(createValidator(validatorMetadata[i]));
            }
        }

        field.on('validated', function(field, previouslyValid) {
            if (field.isValid() !== previouslyValid)
                $element[previouslyValid ? 'addClass' : 'removeClass'] = 'has-error';
        });

        field.on('change', function(field) {
            $element.removeClass('has-error');
        });

        function createValidator(obj, factory) {
            var args = null;
 
            if (typeof(obj) === 'string') 
                validator = self.validatorFactory(meta);
            else if (typeof(obj) !== 'object' || !obj.hasOwnProperty('name')) 
                throw new TypeError('validator: invalid validator encountered: ' + JSON.stringify(obj));
            else {
                validator = self.validatorFactory(obj.name);
                args = obj.args || null;
            }

            if (!validator)
                throw new TypeError('validator: unknown validator "' + (obj.name || obj) + '"');

            return function(field, addError) {
                return validator.fn.call(validator, field, addError, args);
            };
        }
    }
}

export default ValidatorDirective;