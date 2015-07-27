'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatshare
 # @description
 # # wechatshare
###
angular.module('iter001App')
  .directive('wechatshare', (WEB_ENDPOINT)->
    template: '<div></div>'
    restrict: 'EA'
    link: (scope, element, attrs) ->
      console.log '[wechatshare directive]'
      #element.text 'this is the wechatshare directive'
      scope.$watch (->
        scope.house
      ), (status) ->  
        if scope.house?
          house = scope.house
          div = angular.element "<div>"
          div.html """
          <script>
            wx.onMenuShareAppMessage({
                    title: '#{house.name}', // 分享标题
                    desc: '#{house.description}', // 分享描述
                    link: '#{WEB_ENDPOINT}/#/housedetail/#{house.id}', // 分享链接
                    imgUrl: '#{house.image}', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        alert("分享成功");
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        alert("分享已取消");
                    }
                });
          </script>
          """
          console.log div.html
          element.append div
  )
