(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:wechatsign
    * @description
    * # wechatsign
   */
  angular.module('iter001App').directive('wechatsign', function() {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function(scope, element, attrs) {
        var div;
        console.log('[wechatsign directive]');
        div = angular.element("<div>");
        div.html("<script>\n  var url_encoded = encodeURIComponent(location.href.split('#')[0]);\n  console.log(url_encoded);\n\n  //get sign details\n  $.ajax({\n    url: \"http://www.mt5225.cc:3000/api/sign?url=\" + url_encoded\n  }).then(function(data) {\n    console.log(\"<----sign api return-------->\");\n    console.log(data);\n    wx.config({\n      debug: true,\n      appId: data.appid,\n      timestamp: parseInt(data.timestamp),\n      nonceStr: data.nonceStr,\n      signature: data.signature,\n      jsApiList: ['hideOptionMenu']\n    });\n\n    wx.ready(function(){\n      console.log(\"wx auth success !!!\");\n      wx.hideOptionMenu();\n    });\n\n    wx.error(function(res){\n      console.log(res);\n    });\n\n  });\n</script>");
        return element.append(div);
      }
    };
  });

}).call(this);
