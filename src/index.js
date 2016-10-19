import * as Directives from './directives';

// Need to load all the templates upfront
var inputFieldTemplate = require('ngtemplate!html!./templates/input.html'),
    readonlyFieldTemplate = require('ngtemplate!html!./templates/readonly.html'),
    selectFieldTemplate = require('ngtemplate!html!./templates/select.html'),
    checklistFieldTemplate = require('ngtemplate!html!./templates/checklist.html'),
    radiolistFieldTemplate = require('ngtemplate!html!./templates/radiolist.html'),
    textareaFieldTemplate = require('ngtemplate!html!./templates/textarea.html');

var libName = 'ng-dynamic-form';

angular.module(libName, [])
    .directive('dynamicForm', FormDirectiveFactory)
    .directive('fieldModel', FieldModelDirectiveFactory)
    .directive('fieldMultiModel', FieldMultiModelDirectiveFactory)

    .directive('formFieldInput', InputFieldDirectiveFactory)
    .directive('formFieldSelect', SelectFieldDirectiveFactory)
    .directive('formFieldChecklist', CheckListFieldDirectiveFactory)
    .directive('formFieldRadiolist', RadioListFieldDirectiveFactory)
    .directive('formFieldReadonly', ReadonlyFieldDirectiveFactory)
    .directive('formFieldTextarea', TextareaFieldDirectiveFactory);

export default libName;

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
    var directive = new Directives.Field();
    directive.templateUrl = selectFieldTemplate;
    directive.scope = { items: '=' };
    return directive;
}

function CheckListFieldDirectiveFactory() {
    var directive = new Directives.Field();
    directive.templateUrl = checklistFieldTemplate;
    directive.scope = {  items: '=' };
    return directive;
}

function RadioListFieldDirectiveFactory() {
    var directive = new Directives.Field();
    directive.templateUrl = radiolistFieldTemplate;
    directive.scope = { items: '=' };
    return directive;
}

function TextareaFieldDirectiveFactory() {
    var directive = new Directives.Field();
    directive.templateUrl = textareaFieldTemplate;
    return directive;
}