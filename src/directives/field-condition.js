export function FieldConditionDirective() { }

FieldConditionDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldCondition'])
            throw new TypeError('field-condition: must specify a valid condition');

        var speed = parseInt(attrs['speed'], 10);
        if (isNaN(speed))
            speed = 300;

        var off = formCtrl.form.addCondition(attrs['fieldCondition'], scope, active => {
            active ? $element.show(speed) : $element.hide();
        });

        // When destroyed, release the condition
        this.$onDestroy = off;
    }
};

