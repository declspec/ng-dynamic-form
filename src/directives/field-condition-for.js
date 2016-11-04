export default function FieldConditionForDirective() { }

FieldConditionForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldConditionFor'] || !attrs['condition'])
            throw new TypeError('field-condition-for: missing required attribute "' + (attrs['condition'] ? 'field-condition-for' : 'condition') + '"'); 

        var speed = parseInt(attrs['speed'], 10) || 300,
            field = formCtrl.form.getField(attrs['fieldConditionFor']);

        var off = formCtrl.form.addCondition(attrs['condition'], active => {
            field.setActive(active);
            active ? $element.show(speed) : $element.hide();
        });

        // When destroyed, release the condition
        this.$onDestroy = off;
    }
};