(function() {
    'use strict';

    var mod = angular.module('dynamic-forms');

    mod.directive('dynamicForm', function() {
        return {
            restrict: 'AE',
            priority: 400,
            transclude: 'element',
            terminal: true,
            scope: { fields: '=' },
            controller: [ '$scope', function($scope) { 
                console.log('running controller');
                // --
                // Controller functions
                // --
                this.addField = function(field) {
                    fieldMapping[field.Name] = field;
                    allFields.push(field);
                };

                this.getAllFields = function() {
                    return allFields;
                };

                // -- 
                // init
                // --
                
                // Initialise the field mappings
                var fieldMapping = {},
                    allFields = [];

                if (Array.isArray($scope.fields)) {
                    for(var i = 0, j = $scope.fields.length; i < j; ++i) 
                        this.addField($scope.fields[i]);
                }
            }],

            link: function(scope, $element, attrs, ctrl, $transclude) {
                $transclude(scope, function(clone) {
                    $element.after(clone);
                });
            }
        };
    });

    mod.directive('dynamicForm', [ '$q', '$templateRequest', '$compile', function($q, $templateRequest, $compile) {
        return {
            restrict: 'AE',
            priority: -400,
            scope: { fields: '=' },
            require: 'dynamicForm',
            link: function(scope, $element, attrs, ctrl) {
                $element.html('<form></form>');
                var currentElement = angular.element('<dl></dl>');
                $element.find('form').append(currentElement);

                // This form implementation handles the rendering of fields.
                var formTypeTemplateCache = {}, 
                    allFields = ctrl.getAllFields();

                scope.$initialising = true;
                var renderingPromises = allFields.map(function(f) {
                    if (formTypeTemplateCache.hasOwnProperty(f.type))
                        return formTypeTemplateCache[f.type];

                    var promise = $templateRequest('templates/' + f.type + '.html').then($compile);
                    return (formTypeTemplateCache[f.type] = promise);
                });

                $q.all(renderingPromises).then(function(fieldTemplates) {
                    for(var i = 0, j = fieldTemplates.length; i < j; ++i) {
                        var newScope = scope.$new();
                        newScope.field = allFields[i];

                        fieldTemplates[i](newScope, function(clone) {
                            currentElement.append(clone);
                        });
                    }

                    scope.$initialising = false;
                });            
            }
        };
    }]);

    mod.directive('formField', function() {
        return {
            restrict: 'AE',
            require: ['^^dynamicForm', '?^^formGroup'],
            scope: { properties: '=' },
            link: function(scope, $element, attrs, ctrls) {
                console.log('initialising form field');

                if (!attrs['name'] || !attrs['type'])
                    throw new TypeError('form-field: missing required attribute "' + (!attrs['name'] ? 'name' : 'type') + '"');

                var field = {
                    name: attrs['name'],
                    type: attrs['type']
                };

                // Copy across the properties
                if (typeof(scope.properties) === 'object') {
                    for(var prop in scope.properties) {
                        if (scope.properties.hasOwnProperty(prop))
                            field[prop] = scope.properties[prop];
                    }
                }

                // Add the field to the dynamic form
                ctrls[0].addField(field);

                scope.$on('$destroy', function() {
                    console.log('i have been destroyed');
                });
            }
        };
    });
}());