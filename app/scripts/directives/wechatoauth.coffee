'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatOAuth
 # @description
 # # wechatOAuth
###
angular.module 'iter001App'
  .directive 'wechatOAuth', (API_ENDPOINT)->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      div = angular.element "<div>"
      div.html """
      """
      element.append div
