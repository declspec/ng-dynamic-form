export default function ValidatorFactoryProvider() {
    var validators = {};

    this.register = function(name, isAsync, validatorFn) {
        if (validators.hasOwnProperty(name))
            console.warn('overwriting previously registered validator "' + name + '"');

        if (!validatorFn && typeof(isAsync) === 'function') {
            validatorFn = isAsync
            isAsync = false;
        }

        validators[name] = { 'async': !!isAsync, 'name': name, 'fn': validatorFn };
        return this;
    };

    this.$get = function() {
        return function(name) {
            return validators[name] || null;
        };
    };
};