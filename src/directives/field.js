function FieldDirective() { }

FieldDirective.prototype = {
    restrict: 'EA',
    scope: { change: '&', validators: '=' },
    transclude: true,
    require: ['^^dynamicForm'],
    link: {
        // Runs prior to the field template's postLink function
        // use this to initialise any priority scope items
        pre: function(scope, $element, attrs, ctrls) {
            return this.preLink(scope, $element, attrs, ctrls);
        },

        // Runs after the field template's postLink
        post: function(scope, $element, attrs, ctrls) {
            return this.postLink(scope, $element, attrs, ctrls);
        }
    },

    preLink: function(scope, $element, attrs, ctrls) {
        if (!attrs['name'])
            throw new TypeError('form-field: missing required attribute "name"');

        scope.name = attrs['name'];
        scope.label = attrs['label'] || labelise(scope.name);
        scope.field = ctrls[0].form.getField(scope.name);
    },

    postLink: function(scope, $element, attrs, ctrls) { 
        if (!scope.field)
            return;

        var field = scope.field;

        if (attrs['condition']) {
            ctrls[0].form.addCondition(attrs['condition'], function(value) {
                field.setActive(value);
                value ? $element.show('fast') : $element.hide();
            });
        }

        // Set up the 'change' logic so that the scope can listen to
        // field changes.
        if (typeof(scope.change) === 'function') 
            field.on('change', scope.change);

        // Configure any requested validators validators.
        var validatorMetadata = scope.validators,
            createValidator = ctrls[0].createValidator;

        if (validatorMetadata && !Array.isArray(validatorMetadata))
            field.addValidator(createValidator(validator));
        else if (Array.isArray(validatorMetadata) && validatorMetadata.length > 0) {
            for(var i = 0, j = validatorMetadata.length; i < j; ++i) {
                field.addValidator(createValidator(validatorMetadata[i]));
            }
        }
    }
};

export default FieldDirective;

function labelise(name) {
    var label = name.replace(/([A-Z]+)/g, ' $1')
        .replace(/\W+/g, ' ')
        .replace(/\s{2,}/g, ' ');

    return label[0].toUpperCase() + label.substring(1);
}