import Form from '../models/form';

function FormDirective() {}

FormDirective.prototype = {
    restrict: 'AE',
    scope: { state: '=' },
    controller: [ '$scope', '$parse', function($scope, $parse) {
        if (typeof($scope.state) !== 'object')
            $scope.state = {};
        this.form = new Form($scope.state, $parse);
    }]            
};

export default FormDirective;