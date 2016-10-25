import Form from './models/form';
import ValidatorFactoryProvider from './validators/validator-factory';

import * as Directives from './directives';
import * as Validators from './validators';


// Need to load all the templates upfront
var inputFieldTemplate = require('./templates/input.html'),
    readonlyFieldTemplate = require('./templates/readonly.html'),
    selectFieldTemplate = require('./templates/select.html'),
    checklistFieldTemplate = require('./templates/checklist.html'),
    radiolistFieldTemplate = require('./templates/radiolist.html'),
    textareaFieldTemplate = require('./templates/textarea.html');

var libName = 'ng-dynamic-form';

var lib = angular.module(libName, [])
    .service('FormBuilder', FormBuilderService)
    .provider('ValidatorFactory', ValidatorFactoryProvider)

    .directive('dynamicForm', FormDirectiveFactory)
    .directive('fieldModel', FieldModelDirectiveFactory)
    .directive('fieldMultiModel', FieldMultiModelDirectiveFactory)

    .directive('formFieldInput', InputFieldDirectiveFactory)
    .directive('formFieldSelect', SelectFieldDirectiveFactory)
    .directive('formFieldChecklist', CheckListFieldDirectiveFactory)
    .directive('formFieldRadiolist', RadioListFieldDirectiveFactory)
    .directive('formFieldReadonly', ReadonlyFieldDirectiveFactory)
    .directive('formFieldTextarea', TextareaFieldDirectiveFactory);

// Configure validators
lib.config(['ValidatorFactoryProvider', function(validatorFactoryProvider) {
    validatorFactoryProvider.register('required', Validators.Required);
}]);

export default libName;

FormBuilderService.$inject = [ '$parse', '$q' ];
function FormBuilderService($parse, $q) {
    this.build = function(initialState) {
        return new Form(initialState, $parse, $q);
    };
}

function FormDirectiveFactory() {
    return new Directives.Form();
}

function FieldModelDirectiveFactory() {
    return new Directives.FieldModel();
}

function FieldMultiModelDirectiveFactory() {
    return new Directives.FieldMultiModel();
}

function InputFieldDirectiveFactory() {
    var directive = new Directives.InputField();
    directive.templateUrl = inputFieldTemplate;
    return directive;
}

function ReadonlyFieldDirectiveFactory() {
    var directive = new Directives.ReadonlyField();
    directive.templateUrl = readonlyFieldTemplate;
    return directive;
}

function SelectFieldDirectiveFactory() {
    var directive = new Directives.ListField();
    directive.templateUrl = selectFieldTemplate;
    return directive;
}

function CheckListFieldDirectiveFactory() {
    var directive = new Directives.ListField();
    directive.templateUrl = checklistFieldTemplate;
    return directive;
}

function RadioListFieldDirectiveFactory() {
    var directive = new Directives.ListField();
    directive.templateUrl = radiolistFieldTemplate;
    return directive;
}

function TextareaFieldDirectiveFactory() {
    var directive = new Directives.Field();
    directive.templateUrl = textareaFieldTemplate;
    return directive;
}