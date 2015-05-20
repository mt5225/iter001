'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatshare
 # @description
 # # wechatshare
###
angular.module('iter001App')
  .directive('wechatshare', ->
    template: ''
    restrict: 'AE'
    link: (scope, element, attrs) ->
      console.log "[wechatshare directive]"
      house = scope.house
      div = angular.element "<div>"
      div.html """
      <script>
        wx.showOptionMenu();
        wx.onMenuShareAppMessage({
          title: '#{house.name}', // 分享标题
          desc: '#{house.description}', // 分享描述
          link: 'http://www.mt5225.cc:9000/#/houses', // 分享链接
          imgUrl: 'http://www.mt5225.cc:9000/#{house.image}', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
          },
          cancel: function () {
          }
        });
      </script>
      """
      element.append div
  )
