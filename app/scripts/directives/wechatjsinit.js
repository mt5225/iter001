(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatjsInit
    * @description
    * # wechatjsInit
   */
  angular.module('iter001App').directive('wechatjsInit', function() {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var div;
        console.log("[wechat js sdk init directive]");
        div = angular.element("<div>");
        div.html("<script>\n  var url_encoded = encodeURIComponent(location.href.split('#')[0]);\n  console.log(url_encoded);\n  //get sign details\n  $.ajax({\n    url: \"http://qa.aghchina.com.cn:3000/api/sign?url=\" + url_encoded\n  }).then(function(data) {\n    console.log(\"<----sign api return-------->\");\n    console.log(data);\n    wx.config({\n      debug: true,\n      appId: data.appid,\n      timestamp: parseInt(data.timestamp),\n      nonceStr: data.nonceStr,\n      signature: data.signature,\n      jsApiList: ['closeWindow', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline']\n    });\n    wx.ready(function(){\n      console.log(\"wx auth success !!!\");\n    });\n    wx.error(function(res){\n      console.log(res);\n    });\n\n  });\n</script>");
        return element.append(div);
      }
    };
  });

}).call(this);
