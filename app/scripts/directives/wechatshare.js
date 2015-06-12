(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatshare
    * @description
    * # wechatshare
   */
  angular.module('iter001App').directive('wechatshare', function(API_ENDPOINT) {
    return {
      template: '',
      restrict: 'AE',
      link: function(scope, element, attrs) {
        var div, house;
        console.log("[wechat share directive]");
        house = scope.house;
        div = angular.element("<div>");
        div.html("<script>\n  wx.showOptionMenu();\n  wx.onMenuShareAppMessage({\n    title: '" + house.name + "', // 分享标题\n    desc: '" + house.description + "', // 分享描述\n    link: 'http://qa.aghchina.com.cn/#/houses', // 分享链接\n    imgUrl: '" + house.image + "', // 分享图标\n    type: 'link', // 分享类型,music、video或link，不填默认为link\n    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空\n    success: function () {\n    },\n    cancel: function () {\n    }\n  });\n</script>");
        return element.append(div);
      }
    };
  });

}).call(this);
