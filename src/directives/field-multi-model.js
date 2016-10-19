function FieldMultiModelDirective() {}

FieldMultiModelDirective.prototype = {
    restrict: 'A',
    require: '^^dynamicForm',
    link: function(scope, $element, attrs, formController) {
        if (!attrs['fieldMultiModel'] || !attrs['value'])
            throw new TypeError('form-multi-model: missing required attribute "' + (!attrs['fieldMultiModel'] ? 'field-multi-model' : 'value') + '"');

        var field = formController.form.getField(attrs['fieldMultiModel']),
            element = $element.get(0),
            value = attrs['value'],
            allowMultiple = attrs['type'] === 'checkbox';

        field.on('change', onUpdate);

        $element.on('change', function() {
            return allowMultiple || this.checked
                ? scope.$apply(processChange)
                : null;
        }); 

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

        function onUpdate(field, modelValue) {
            element.checked = modelValue 
                && ((!Array.isArray(modelValue) && modelValue == value) 
                    || (Array.isArray(modelValue) && modelValue.indexOf(value) >= 0));
        }
    }
};

export default FieldMultiModelDirective;