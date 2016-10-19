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

export default ReadonlyFieldDirective;