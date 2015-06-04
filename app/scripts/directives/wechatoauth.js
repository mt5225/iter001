(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatOAuth
    * @description
    * # wechatOAuth
   */
  angular.module('iter001App').directive('wechatOAuth', function(API_ENDPOINT) {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var div;
        div = angular.element("<div>");
        div.html("      ");
        return element.append(div);
      }
    };
  });

}).call(this);
