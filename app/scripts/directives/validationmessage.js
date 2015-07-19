(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:validationmessage
    * @description
    * # validationmessage
   */
  angular.module('iter001App').directive('validationmessage', function($log) {
    return {
      restrict: 'AE',
      scope: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        return scope.$watch((function() {
          return scope.validateMsg;
        }), function(msg) {
          var div;
          if (msg != null) {
            msg = msg.split('|')[0];
            $log.debug("something changed " + msg);
            if (msg.length > 1) {
              div = angular.element("<div>");
              div.html("<script> Materialize.toast('" + msg + "', 3000, 'fixtop'); </script>");
              return element.append(div);
            }
          }
        });
      }
    };
  });

}).call(this);
