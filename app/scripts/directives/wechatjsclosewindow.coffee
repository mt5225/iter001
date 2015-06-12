'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatjsCloseWindow
 # @description
 # # wechatjsCloseWindow
###
angular.module 'iter001App'
  .directive('wechatjsCloseWindow', ->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      console.log "[wechat js close window directive]"
      div = angular.element "<div>"
      div.html """
      <script>
        wx.closeWindow();
      </script>
      """
      element.append div
)
