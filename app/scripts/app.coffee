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
    .when '/myorder',
      templateUrl: 'views/myorder.html'
      controller: 'MyorderCtrl'
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

#my order service
.factory 'myorderService', () ->
  orders = []
  return {
    saveOrder: (order) ->
      console.log order
      orders.push order
      return
    getOrder: ->
      orders
  }

#house service
.factory 'houseService', ->
  houses = [
    {id: 'H001', name: '喜乐屋', likes: '16', price: '1050', image: 'images/xile.jpg' , avator: 'images/yuna.jpg',
    description: 'Qulity is not an act, it is an habit.', owner: "Luke Xie", stars: 5}
    {id: 'H002', name: '向日葵', likes: '22', price: '850', image: 'images/xrk.jpg', avator: 'images/avator.jpg',
    description: 'One apple a day keep doctor away', owner: "Jerry Jiang", stars: 4}
    {id: 'H003', name: '喜乐屋', likes: '16', price: '1050', image: 'images/xile.jpg' , avator: 'images/yuna.jpg',
    description: 'Qulity is not an act, it is an habit.', owner: "Luke Xie", stars: 5}
    {id: 'H004', name: '向日葵', likes: '22', price: '850', image: 'images/xrk.jpg', avator: 'images/avator.jpg',
    description: 'One apple a day keep doctor away', owner: "Jerry Jiang", stars: 4}
  ]
  return {
    getHouseList: ->
      houses
    getHouseById: (id) ->
      for h in houses
        return h if h.id == id
  }

#UUID service
.factory 'uuidService', ->
  return {
    generateUUID: ->
      delim = "-"
      S4 = ->
        (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      (S4() + delim + S4())
  }

#Passing data between pages
.factory 'paramService', ->
  saveData = {}
  return {
    set: (data) ->
      saveData = data
    get: ->
      saveData
  }


################################################################################
#### Directives
################################################################################

#change nav bar content according to url, show order in /order
#inject location service
.directive "navbar", ['$location', (location) ->
  (scope, element) ->
]

#show alert messages
#inject flash service
.directive "alertmessage", ['flash', (flash) ->
  (scope, element) ->
    console.log "[directive] alert message = '#{flash.getMessage()}'"
    msg = flash.getMessage()
    if msg
      div = angular.element "<div>"
      div.html "<script> Materialize.toast('"+ msg + "', 3000); </script>"
      element.append div
]

return



