export function FieldValidationMessagesForDirective() { }

FieldValidationMessagesForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    template: `<ul><li ng-repeat="error in errors" ng-bind="::error"></li></ul>`,
    scope: {},
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldValidationMessagesFor'])
            throw new TypeError('field-validation-messages-for: missing required attribute "field-validation-messages-for"');

        var field = formCtrl.form.getField(attrs['fieldValidationMessagesFor']);

        field.on('validate', onValidate);
        onValidate(field);

        function onValidate(f) {
            if (f.isValid()) {
                scope.errors =  null;
                $element.hide();
            }
            else {
                scope.errors = f.getErrors();
                $element.show();
            }
        }
    }
};