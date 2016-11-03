const ERROR_CLASS = 'df-error-list';

export default function FieldValidationMessagesForDirective() { }

FieldValidationMessagesForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    template: `<ul class="${ERROR_CLASS}" ng-if="errors.length"><li ng-repeat="error in errors" ng-bind="::error"></li></ul>`,
    scope: {},
    link: function(scope, $element, attrs, formCtrl) {
        if (!attrs['fieldValidationMessagesFor'])
            throw new TypeError('validation-messages-for: missing required attribute "field-validation-messages-for"');

        var field = formCtrl.form.getField(attrs['fieldValidationMessagesFor']);
        field.on('validate', f => {
            scope.errors = f.isValid() ? null : f.getErrors();
        });
    }
};