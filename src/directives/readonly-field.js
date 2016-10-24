import FieldDirective from './field';

function ReadonlyFieldDirective() { };

ReadonlyFieldDirective.prototype = Object.create(FieldDirective.prototype, {
    constructor: {
        value: ReadonlyFieldDirective,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

ReadonlyFieldDirective.prototype.preLink = function(scope, $element, attrs, ctrls) {
    FieldDirective.prototype.preLink.call(this, scope, $element, attrs, ctrls);

    scope.value = scope.field.val();

    scope.field.on('change', function(field, value) {
        scope.value = value;
    });
};

ReadonlyFieldDirective.prototype.postLink = function(scope, $element, attrs, ctrls) {
    // A 'readonly' field is passive: i.e. it should not be directly controlling the field's
    // state. Due to this we override the base postLink and implement our own.
    if (scope.field && attrs['condition']) {
        ctrls[0].form.addCondition(attrs['condition'], function(value) {
            value ? $element.show('fast') : $element.hide();
        });
    }
};

export default ReadonlyFieldDirective;