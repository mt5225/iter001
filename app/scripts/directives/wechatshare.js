(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatshare
    * @description
    * # wechatshare
   */
  angular.module('iter001App').directive('wechatshare', function(WEB_ENDPOINT) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function(scope, element, attrs) {
        console.log('[wechatshare directive]');
        return scope.$watch((function() {
          return scope.house;
        }), function(status) {
          var div, house;
          if (scope.house != null) {
            house = scope.house;
            div = angular.element("<div>");
            div.html("<script>\n  wx.onMenuShareAppMessage({\n          title: '" + house.name + "', // 分享标题\n          desc: '" + house.description + "', // 分享描述\n          link: '" + WEB_ENDPOINT + "/#/housedetail/" + house.id + "', // 分享链接\n          imgUrl: '" + house.image + "', // 分享图标\n          type: 'link', // 分享类型,music、video或link，不填默认为link\n          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空\n          success: function() {\n              alert(\"分享成功\");\n          },\n          cancel: function() {\n              // 用户取消分享后执行的回调函数\n              alert(\"分享已取消\");\n          }\n      });\n</script>");
            console.log(div.html);
            return element.append(div);
          }
        });
      }
    };
  });

}).call(this);
