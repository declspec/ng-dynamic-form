import Form from './models/form';
import ValidatorFactoryProvider from './validators/validator-factory';

import * as Directives from './directives';
import * as Validators from './validators';

var lib = angular.module('ng-dynamic-form', [])
    .service('FormBuilder', FormBuilderService)
    .provider('ValidatorFactory', ValidatorFactoryProvider)

    .directive('dynamicForm',       () => new Directives.DynamicForm())
    .directive('fieldModel',        () => new Directives.FieldModel())
    .directive('fieldMultiModel',   () => new Directives.FieldMultiModel())
    .directive('fieldCondition',    () => new Directives.FieldCondition())
    .directive('fieldConditionFor', () => new Directives.FieldConditionFor())

    .directive('fieldValidationFor', FieldValidationForDirectiveFactory)
    .directive('fieldValidationMessagesFor', () => new Directives.FieldValidationMessagesFor());
    
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

FieldValidationForDirectiveFactory.$inject = [ 'ValidatorFactory' ];
function FieldValidationForDirectiveFactory(validatorFactory) {
    return new Directives.FieldValidationFor(validatorFactory);
}