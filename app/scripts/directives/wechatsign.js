(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatsign
    * @description
    * # wechatsign
   */
  angular.module('iter001App').directive('wechatsign', function(API_ENDPOINT, WEB_ENDPOINT) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function(scope, element, attrs) {
        var div;
        console.log('[wechatsign directive]');
        console.log(API_ENDPOINT);
        div = angular.element("<div>");
        div.html("<script>\n  var url_encoded = encodeURIComponent(location.href.split('#')[0]);\n  console.log(url_encoded);\n\n  //get sign details\n  $.ajax({\n    url: \"" + API_ENDPOINT + "/api/sign?url=\" + url_encoded\n  }).then(function(data) {\n    console.log(\"<----sign api return-------->\");\n    console.log(data);\n    wx.config({\n      debug: false,\n      appId: data.appid,\n      timestamp: parseInt(data.timestamp),\n      nonceStr: data.nonceStr,\n      signature: data.signature,\n      jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'closeWindow']\n    });\n\n    //hide the share button\n    wx.ready(function(){\n      console.log(\"wx auth success !!!\");\n      wx.onMenuShareAppMessage({\n          title: '漫生活部落', // 分享标题\n          desc: '那株久远到无法考证年代的香樟树，那湾清澈可见底的涓涓溪水，那抹夜色中的草长莺飞衍生野趣。点击进入漫生活 ...   客服电话 0571-64668358', // 分享描述\n          link: '" + WEB_ENDPOINT + "', // 分享链接\n          imgUrl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/DEV/Others/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwithout%20name.jpg', // 分享图标\n          type: 'link', // 分享类型,music、video或link，不填默认为link\n          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空\n          success: function() {\n              \n          },\n          cancel: function() {\n              // 用户取消分享后执行的回调函数\n              \n          }\n      });\n    });\n\n    wx.error(function(res){\n      console.log(res);\n    });\n\n  });\n</script>");
        return element.append(div);
      }
    };
  });

}).call(this);
