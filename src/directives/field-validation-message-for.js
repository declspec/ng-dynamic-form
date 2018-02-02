export function FieldValidationMessageForDirective() { }

FieldValidationMessageForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    template: '<span ng-bind="error"></span>',
    scope: {},
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldValidationMessageFor'])
            throw new TypeError('field-validation-message-for: missing required attribute "field-validation-message-for"');

        var field = formCtrl.form.getField(attrs['fieldValidationMessageFor']);

        var unbindValidate = field.on('validate', onUpdated),
            unbindChange = field.on('change', onUpdated);

        this.$onDestroy = () => {
            unbindValidate();
            unbindChange();
        };
        
        onUpdated(field);

        function onUpdated(f) {
            let errors = f.getErrors();
            scope.error = errors ? errors[0] : null;
            $element[scope.error ? 'show' : 'hide']();
        }
    }
};