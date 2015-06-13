'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatsign
 # @description
 # # wechatsign
###
angular.module('iter001App')
  .directive('wechatsign', (API_ENDPOINT)->
    template: '<div></div>'
    restrict: 'EA'
    link: (scope, element, attrs) ->
      console.log '[wechatsign directive]'
      #element.text 'this is the wechatsign directive'
      #get house image
      console.log API_ENDPOINT
      div = angular.element "<div>"
      div.html """
      <script>
        var url_encoded = encodeURIComponent(location.href.split('#')[0]);
        console.log(url_encoded);

        //get sign details
        $.ajax({
          url: "#{API_ENDPOINT}/api/sign?url=" + url_encoded
        }).then(function(data) {
          console.log("<----sign api return-------->");
          console.log(data);
          wx.config({
            debug: false,
            appId: data.appid,
            timestamp: parseInt(data.timestamp),
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['hideOptionMenu', 'showOptionMenu', 'onMenuShareAppMessage', 'onMenuShareTimeline']
          });

          //hide the share button
          wx.ready(function(){
            console.log("wx auth success !!!");
            wx.hideOptionMenu();
          });

          wx.error(function(res){
            console.log(res);
          });

        });
      </script>
      """
      element.append div
  )
