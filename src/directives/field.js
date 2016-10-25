import required from '../validators/required';

function FieldDirective() { }

FieldDirective.prototype = {
    restrict: 'EA',
    scope: { change: '&' },
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
        var field = scope.field;

        if (field && attrs['condition']) {
            ctrls[0].form.addCondition(attrs['condition'], function(value) {
                field.setActive(value);
                value ? $element.show('fast') : $element.hide();
            });
        }

        if (field && typeof(scope.change) === 'function') {
            field.on('change', scope.change);
        }

        scope.field.addValidator(required);

        scope.field.on('validated', function(field, previouslyValid) {
            if (field.isValid() !== previouslyValid)
                $element[previouslyValid ? 'addClass' : 'removeClass'] ('has-error');
        });
    }
};

export default FieldDirective;

function labelise(name) {
    var label = name.replace(/([A-Z]+)/g, ' $1')
        .replace(/\W+/g, ' ')
        .replace(/\s{2,}/g, ' ');

    return label[0].toUpperCase() + label.substring(1);
}