export function FieldConditionForDirective() { }

FieldConditionForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldConditionFor'] || !attrs['condition'])
            throw new TypeError('field-condition-for: missing required attribute "' + (attrs['condition'] ? 'field-condition-for' : 'condition') + '"'); 

        var speed = parseInt(attrs['speed'], 10),
            field = formCtrl.form.getField(attrs['fieldConditionFor']);
        
        if (isNaN(speed))
            speed = 300;

        var off = formCtrl.form.addCondition(attrs['condition'], scope, active => {
            field.setActive(active);
            active ? $element.show(speed) : $element.hide();
        });

        // When destroyed, release the condition
        scope.$on('$destroy', off);
    }
};