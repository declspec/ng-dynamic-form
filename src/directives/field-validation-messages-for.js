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

        field.on('validate', onUpdated);
        field.on('change', onUpdated);
        onUpdated(field);

        function onUpdated(f) {
            scope.errors = f.getErrors();
            $element[scope.errors ? 'show' : 'hide']();
        }
    }
};