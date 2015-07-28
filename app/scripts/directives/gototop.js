(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:gototop
    * @description
    * # gototop
   */
  angular.module('iter001App').directive('gototop', function() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var div;
        div = angular.element("<div>");
        div.html("<script>\n  $(document).ready(function() {\n      $(\"html,body\").animate({\n          scrollTop: 0\n      }, 500);\n  });\n</script>");
        return element.append(div);
      }
    };
  });

}).call(this);
