function FormDirective() {}

FormDirective.prototype = {
    restrict: 'AE',
    scope: { },
    bindToController: { form: '=' }   
};

export default FormDirective;