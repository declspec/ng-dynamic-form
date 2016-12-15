export function MultiFieldConditionForDirective() { }

MultiFieldConditionForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['multiFieldConditionFor'] || !attrs['condition'])
            throw new TypeError('multi-field-condition-for: missing required attribute "' + (attrs['condition'] ? 'multi-field-condition-for' : 'condition') + '"'); 

        var speed = parseInt(attrs['speed'], 10) || 300,
            fieldNames = scope.$eval(attrs['multiFieldConditionFor']),
            fields = fieldNames.map(n => formCtrl.form.getField(n));

        var off = formCtrl.form.addCondition(attrs['condition'], active => {
            fields.forEach(f => f.setActive(active));
            active ? $element.show(speed) : $element.hide();
        });

        // When destroyed, release the condition
        this.$onDestroy = off;
    }
};