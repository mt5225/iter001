'use strict'

###*
# @ngdoc overview
# @name iter001App
# @description
# # iter001App
#
# Main module of the application.
###

angular.module('iter001App', [
  'ngAnimate'
  'ngAria'
  'ngCookies'
  'ngMessages'
  'ngResource'
  'ngRoute'
  'ngSanitize'
  'ngTouch'
]).config ($routeProvider) ->
  $routeProvider
    .when('/',
      templateUrl: 'views/main.html'
      controller: 'MainCtrl')
    .when('/about',
      templateUrl: 'views/about.html'
      controller: 'AboutCtrl')
    .when '/order',
      templateUrl: 'views/order.html'
      controller: 'OrderCtrl'
    .otherwise redirectTo: '/'


################################################################################
#### Services
################################################################################

#message service
.factory 'flash', ($rootScope) ->
  queue = []
  currentMessage = ''
  $rootScope.$on '$routeChangeSuccess', ->
    currentMessage = queue.shift() or ''
    console.log "route change with message '#{currentMessage}'"

  return {
     setMessage: (message) ->
       queue.push message
       return
     getMessage: ->
       console.log "in getMessage with '#{currentMessage}'"
       currentMessage
  }

################################################################################
#### Directives
################################################################################

#change nav bar content according to url, show order in /order
.directive "navbar", ['$location', (location) ->
  (scope, element) ->
    url = location.path()
    console.log "url =  '#{url}'"
    navbar_content = element.find('#navbar')[0]
    #hind nav bar in order card
    if url in ['/order']
      navbar_content.style.display = 'none'
    else
      navbar_content.style.display = 'block'

]

#TODO show message
.directive "alertmessage", ['flash', (flash) ->
  (scope, element) ->
    console.log "[directive] alert message = '#{flash.getMessage()}'"
    div = angular.element "<div>"
    div.attr 'class', 'Alert'
    element.append div
    div.append angular.element("<p>").text(flash.getMessage())
]

return



