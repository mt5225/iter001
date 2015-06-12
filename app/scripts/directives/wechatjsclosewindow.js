(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatjsCloseWindow
    * @description
    * # wechatjsCloseWindow
   */
  angular.module('iter001App').directive('wechatjsCloseWindow', function() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var div;
        console.log("[wechat js close window directive]");
        div = angular.element("<div>");
        div.html("<script>\n  wx.closeWindow();\n</script>");
        return element.append(div);
      }
    };
  });

}).call(this);
