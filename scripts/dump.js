
        var commitViewValue = modelController.$commitViewValue,
            self = this;

        modelController.$render = function() {
            self.onValueChanged(self.value());
        };

        modelController.$commitViewValue = function() {
            var result = commitViewValue.call(self.$$ctrl);
            self.onValueChanged(self.value());
            return result;
        };

        if (validators && validators.length) {
            for(var i = 0, j = validators.length; i < j; ++i) {
                var meta = validators[i],
                    validator = null,
                    args = null;
                
                if (typeof(meta) === 'string') 
                    validator = validatorFactory(meta);
                else if (typeof(meta) === 'object' && meta.hasOwnProperty('name')) {
                    validator = validatorFactory(meta.name);
                    args = meta.args || null;
                }

                var collection = validator.async 
                    ? modelController.$asyncValidators 
                    : modelController.$validators;
                    
                collection[validator.name] = function(modelValue, viewValue) {
                    var result = validator.fn.call(validator, self, modelValue, viewValue, args);
                    self.setError(validator.name, result);
                    return result === true;
                };
            }
        }