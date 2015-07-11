'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:validationmessage
 # @description
 # # validationmessage 
###
angular.module 'iter001App'
  .directive('validationmessage', ($log)->
    restrict: 'AE'
    scope: true
    template: '<div></div>'
    link: (scope, element, attrs) ->
      scope.$watch (->
        scope.validateMsg
      ), (msg) ->
        if msg?
          msg = msg.split('|')[0]
          $log.debug "something changed #{msg}"
          if msg.length > 1
            div = angular.element "<div>"
            div.html "<script> Materialize.toast('#{msg}', 2000); </script>"
            element.append div
  )
          
      