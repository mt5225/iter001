'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatjsInit
 # @description
 # # wechatjsInit
###
angular.module 'iter001App'
  .directive('wechatjsInit', ->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      console.log "[wechat js sdk init directive]"
      div = angular.element "<div>"
      div.html """
      <script>
        var url_encoded = encodeURIComponent(location.href.split('#')[0]);
        console.log(url_encoded);
        //get sign details
        $.ajax({
          url: "http://qa.aghchina.com.cn:3000/api/sign?url=" + url_encoded
        }).then(function(data) {
          console.log("<----sign api return-------->");
          console.log(data);
          wx.config({
            debug: true,
            appId: data.appid,
            timestamp: parseInt(data.timestamp),
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['closeWindow', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline']
          });
          wx.ready(function(){
            console.log("wx auth success !!!");
          });
          wx.error(function(res){
            console.log(res);
          });

        });
      </script>
      """
      element.append div
)
      
