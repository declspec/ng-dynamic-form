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

        var validators = validatorMetadata && !Array.isArray(validatorMetadata)
            ? [ createValidator(validatorMetadata) ]
            : (Array.isArray(validatorMetadata) ? validatorMetadata.map(createValidator) : []);

        field.on('change', function(field) {
            
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

            return function(field) {
                return validator.fn.call(validator, field, args);
            };
        }
    }
}

export default ValidatorDirective;