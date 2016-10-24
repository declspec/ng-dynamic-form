function FormDirective() {}

FormDirective.prototype = {
    restrict: 'AE',
    scope: { form: '=' },
    controller: [ '$scope', function($scope) { 
        this.form = $scope.form;
    }],
};

export default FormDirective;