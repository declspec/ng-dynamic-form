import FieldDirective from './field';

function ListFieldDirective() { };

ListFieldDirective.prototype = Object.create(FieldDirective.prototype, {
    constructor: {
        value: ListFieldDirective,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

ListFieldDirective.prototype.scope.items = '=';

ListFieldDirective.prototype.preLink = function(scope, $element, attrs, ctrls) {
    FieldDirective.prototype.preLink.call(this, scope, $element, attrs, ctrls);

    scope.valueProperty = attrs['valueProp'] || 'id';
    scope.displayProperty = attrs['displayProp'] || 'name';
};

export default ListFieldDirective;