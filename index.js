import Form from './src/models/form';
import { ValidatorFactoryProvider } from './src/validators/validator-factory';

import * as d from './src/directives';
import * as v from './src/validators';

var lib = angular.module('ng-dynamic-form', [])
    .service('FormBuilder', FormBuilderService)
    .provider('ValidatorFactory', ValidatorFactoryProvider)

    .directive('dynamicForm', wrap(d.DynamicFormDirective))
    .directive('fieldModel', wrap(d.FieldModelDirective))
    .directive('fieldMultiModel', wrap(d.FieldMultiModelDirective))
    .directive('fieldCondition', wrap(d.FieldConditionDirective))
    .directive('fieldConditionFor', wrap(d.FieldConditionForDirective))
    .directive('fieldValidationFor', wrap(d.FieldValidationForDirective))
    .directive('fieldValidationMessageFor', wrap(d.FieldValidationMessageForDirective))
    .directive('fieldValidationMessagesFor', wrap(d.FieldValidationMessagesForDirective));
    
// Configure validators
lib.config(['ValidatorFactoryProvider', function(validatorFactoryProvider) {
    validatorFactoryProvider.register('required', false, v.RequiredValidator);
    validatorFactoryProvider.register('numeric', false, v.NumericValidator);
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