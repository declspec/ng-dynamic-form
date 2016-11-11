import Form from './src/models/form';
import ValidatorFactoryProvider from './src/validators/validator-factory';

import * as Directives from './src/directives';
import * as Validators from './src/validators';

var lib = angular.module('ng-dynamic-form', [])
    .service('FormBuilder', FormBuilderService)
    .provider('ValidatorFactory', ValidatorFactoryProvider)

    .directive('dynamicForm', wrap(Directives.DynamicForm))
    .directive('fieldModel', wrap(Directives.FieldModel))
    .directive('fieldMultiModel', wrap(Directives.FieldMultiModel))
    .directive('fieldCondition', wrap(Directives.FieldCondition))
    .directive('fieldConditionFor', wrap(Directives.FieldConditionFor))
    .directive('fieldValidationFor', wrap(Directives.FieldValidationFor))
    .directive('fieldValidationMessagesFor', wrap(Directives.FieldValidationMessagesFor));
    
// Configure validators
lib.config(['ValidatorFactoryProvider', function(validatorFactoryProvider) {
    validatorFactoryProvider.register('required', false, Validators.Required);
}]);

export default lib.name;

// --
// Internal helpers to create services/directives
// --
FormBuilderService.$inject = [ '$parse', '$q' ];
function FormBuilderService($parse, $q) {
    this.build = state => new Form(state, $parse, $q);
}

function wrap(ctor) {
    var inject = ctor.dependencies || ctor.prototype.dependencies;
    if (!inject) 
        return () => new ctor();

    var factory = function() { return new ctor(...arguments); };
    factory.$inject = inject;
    return factory;
}