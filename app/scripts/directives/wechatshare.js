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
            div.html("<script>\n  wx.onMenuShareAppMessage({\n        title: '" + house.name + "', // 分享标题\n        desc: '" + house.description + "', // 分享描述\n        link: '" + WEB_ENDPOINT + "/#/housedetail/" + house.id + "', // 分享链接\n        imgUrl: '" + house.image + "', // 分享图标\n        type: 'link', // 分享类型,music、video或link，不填默认为link\n        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空\n        success: function() {\n        },\n        cancel: function() {\n            // 用户取消分享后执行的回调函数\n        }\n      });\n  wx.onMenuShareTimeline({\n        title: '" + house.name + "', // 分享标题\n        link: '" + WEB_ENDPOINT + "/#/housedetail/" + house.id + "', // 分享链接\n        imgUrl: '" + house.image + "', // 分享图标\n        success: function () { \n            \n            // 用户确认分享后执行的回调函数\n        },\n        cancel: function () { \n            // 用户取消分享后执行的回调函数\n           \n        }\n      });\n</script>");
            return element.append(div);
          } else {
            div = angular.element("<div>");
            div.html = "<script type=\"text/javascript\">\n  wx.onMenuShareAppMessage({\n      title: '漫生活部落', // 分享标题\n      desc: '那株久远到无法考证年代的香樟树，那湾清澈可见底的涓涓溪水，那抹夜色中的草长莺飞衍生野趣。点击进入漫生活 ...   客服电话 0571-64668358', // 分享描述\n      link: '" + WEB_ENDPOINT + "', // 分享链接\n      imgUrl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/DEV/Others/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwithout%20name.jpg', // 分享图标\n      type: 'link', // 分享类型,music、video或link，不填默认为link\n      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空\n      success: function() {                   \n      },\n      cancel: function() {\n          // 用户取消分享后执行的回调函数                  \n      }\n  });\n  wx.onMenuShareTimeline({\n      title: '漫生活部落', // 分享标题\n      link: '" + WEB_ENDPOINT + "', // 分享链接\n      imgUrl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/DEV/Others/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwithout%20name.jpg', // 分享图标\n      success: function () { \n          // 用户确认分享后执行的回调函数\n      },\n      cancel: function () { \n          // 用户取消分享后执行的回调函数                   \n      }\n  });\n</script>";
            return element.append(div);
          }
        });
      }
    };
  });

}).call(this);
