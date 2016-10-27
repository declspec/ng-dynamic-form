function ValidationForDirective(compiler) { 
    this.compiler = compiler;
}

var ERROR_TEMPLATE = [
    '<div class="ng-dynamic-form-errors" ng-if="errors && errors.length">',
    '   <ul><li ng-repeat="error in errors" ng-bind="error"></li></ul>',
    '</div>'
].join('');

ValidationForDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    scope: {},
    link: function(scope, $element, attrs, formController) {
        if (!attrs['validationFor'])
            throw new TypeError('validation-for: missing required attribute "validation-for"');

        var pos = attrs['pos'] || 'after',
            field = formController.form.getField(attrs['validationFor']),
            $error = this.compiler(ERROR_TEMPLATE)(scope);

        if (pos === 'after')
            $element.after($error);
        else if (pos === 'last')
            $element.append($error);
        else if (pos === 'first')
            $element.prepend($error);

        field.on('validate', function(f) {
            var valid = f.isValid();
            scope.errors = valid ? null : f.getErrors();
            $element[valid ? 'removeClass' : 'addClass']('ng-dynamic-form-invalid');
        });
    }
}

export default ValidationForDirective;