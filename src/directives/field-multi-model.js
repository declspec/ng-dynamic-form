export function FieldMultiModelDirective(parse) {
    this.parse = parse;
}

FieldMultiModelDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    dependencies: [ '$parse' ],
    link: function(scope, $element, attrs, formController) {
        if (!attrs['fieldMultiModel'] || (!attrs['value'] && !attrs['ngValue']))
            throw new TypeError('form-multi-model: missing required attribute "' + (!attrs['fieldMultiModel'] ? 'field-multi-model' : 'value') + '"');

        var field = formController.form.getField(attrs['fieldMultiModel']),
            element = $element.get(0),
            allowMultiple = attrs['type'] === 'checkbox';

        var value = attrs['ngValue']
            ? this.parse(attrs['ngValue'])(formController.form.$$fields)
            : attrs['value'];

        $element.on('change', function() {
            if (allowMultiple || this.checked)
                scope.$apply(processChange);
        }); 

        field.on('change', onUpdate);
        onUpdate(field);

        function processChange() {
            if (!allowMultiple)
                return field.setValue(value);
            
            var model = field.val();
            if (!Array.isArray(model))
                model = model ? [ model ] : [];
                
            var idx = model.indexOf(value);

            if (element.checked && idx < 0) {
                model.push(value);
                field.setValue(model);
            }
            else if (!element.checked && idx >= 0) {
                model.splice(idx, 1);
                field.setValue(model);
            }
        }

        function onUpdate(field) {
            const modelValue = field.val();
            const shouldBeChecked = (!Array.isArray(modelValue) && modelValue == value) 
                || (Array.isArray(modelValue) && modelValue.indexOf(value) >= 0);

            if (element.checked !== shouldBeChecked)
                element.checked = shouldBeChecked;
        }
    }
};
