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

        var trackBy = attrs['trackBy'];
        var value = attrs['ngValue']
            ? this.parse(attrs['ngValue'])(scope, formController.form.$$fields)
            : attrs['value'];

        $element.on('change', function() {
            if (allowMultiple || this.checked)
                scope.$apply(processChange);
        }); 

        field.on('change', onUpdate);
        field.on('toggle', onUpdate);
        onUpdate(field);

        function processChange() {
            if (!allowMultiple)
                return field.setValue(value);
            
            var model = field.val();
            var idx = -1;

            if (!Array.isArray(model))
                model = model ? [ model ] : [];

            for(var i = 0, j = model.length; i < j; ++i) {
                if (compareValues(model[i])) {
                    idx = i;
                    break;
                }
            }

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
            var modelValue = field.val();
            var shouldBeChecked = (!Array.isArray(modelValue) && compareValues(modelValue)) 
                || (Array.isArray(modelValue) && modelValue.some(compareValues));

            if (element.checked !== shouldBeChecked)
                element.checked = shouldBeChecked;
        }

        function compareValues(modelValue) {
            if (!trackBy)
                return modelValue == value;

            return modelValue && value
                && typeof(modelValue) === typeof(value)
                && modelValue.hasOwnProperty(trackBy) && value.hasOwnProperty(trackBy)
                && modelValue[trackBy] == value[trackBy];
        }
    }
};
