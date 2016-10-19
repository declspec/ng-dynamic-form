function FieldDirective() { }

FieldDirective.prototype = {
    restrict: 'EA',
    scope: {},
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

        if (scope.field && attrs['condition']) {
            ctrls[0].form.addFieldCondition(scope.field, attrs['condition'], function(value) {
                value ? $element.show('fast') : $element.hide();
            });
        }
    },

    postLink: function(scope, $element, attrs, ctrls) { 
        // Empty stub, can be overriden if needed
    }
};

export default FieldDirective;

function labelise(name) {
    var label = name.replace(/([A-Z]+)/g, ' $1')
        .replace(/\W+/g, ' ')
        .replace(/\s{2,}/g, ' ');

    return label[0].toUpperCase() + label.substring(1);
}