'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatshare
 # @description
 # # wechatshare
###
angular.module('iter001App')
  .directive('wechatshare', (API_ENDPOINT)->
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
          link: '#{API_ENDPOINT}/#/houses', // 分享链接
          imgUrl: '#{API_ENDPOINT}/#{house.image}', // 分享图标
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
