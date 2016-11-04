import Form from './models/form';
import ValidatorFactoryProvider from './validators/validator-factory';

import * as Directives from './directives';
import * as Validators from './validators';

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
    else {
        var factory = function() { return new ctor(...arguments); };
        factory.$inject = inject;
        return factory;
    }
}