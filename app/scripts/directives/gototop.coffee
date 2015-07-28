'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:gototop
 # @description
 # # gototop
###
angular.module 'iter001App'
  .directive 'gototop', ->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
      div = angular.element "<div>"
      div.html """
      <script>
        $(document).ready(function() {
            $("html,body").animate({
                scrollTop: 0
            }, 500);
        });
      </script>
      """
      element.append div
