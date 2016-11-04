export default function DynamicFormDirective() {}

DynamicFormDirective.prototype = {
    restrict: 'A',
    scope: { form: '=dynamicForm' },
    controller: ['$scope', function(scope) {
        if (!scope.form)
            throw new TypeError('dynamic-form: invalid form specified');
        this.form = scope.form;
    }]
};
