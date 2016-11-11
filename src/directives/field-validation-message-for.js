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

        field.on('validate', onValidate);
        onValidate(field);

        function onValidate(f) {
            if (f.isValid()) {
                scope.error =  null;
                $element.hide();
            }
            else {
                var allErrors = f.getErrors();
                scope.error = allErrors[0];
                $element.show();
            }
        }
    }
};