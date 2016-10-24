import FieldDirective from './field';

function InputFieldDirective(validatorFactory) { 
    FieldDirective.call(this, validatorFactory);
};

InputFieldDirective.prototype = Object.create(FieldDirective.prototype, {
    constructor: {
        value: InputFieldDirective,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

InputFieldDirective.prototype.preLink = function(scope, $element, attrs, ctrls) {
    FieldDirective.prototype.preLink.call(this, scope, $element, attrs, ctrls);

    if (!attrs['type'])
        throw new TypeError('form-field-input: missing required attribute "type"');
    scope.type = attrs['type'];
};

export default InputFieldDirective;