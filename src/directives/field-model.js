export function FieldModelDirective() {}

FieldModelDirective.prototype = { 
    restrict: 'A',
    require: ['^^dynamicForm', 'ngModel' ],
    link: function(scope, $element, attrs, ctrls) {
        if (!attrs['fieldModel'])
            throw new TypeError('form-model: missing required attribute "field-model"');
        
        var field = ctrls[0].form.getField(attrs['fieldModel']),
            modelController = ctrls[1];

        modelController.$setViewValue(field.val());
        modelController.$commitViewValue();
        modelController.$render();

        // Override model controller methods     
        var commitViewValue = modelController.$commitViewValue,
            render = modelController.$render;

        modelController.$render = function() {
            var value = this.$modelValue || this.$viewValue;
            if (value || modelController.$dirty)
                field.setValue(value);
            return render.call(this);
        };

        modelController.$commitViewValue = function() {
            var result = commitViewValue.call(this);
            field.setValue(this.$modelValue || this.$viewValue);
            return result;
        };
    }
};
