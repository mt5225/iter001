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
    .when('/',  #首页
      templateUrl: 'views/frontpage.html'
      controller: 'FrontpageCtrl')
    .when('/about', #关于
      templateUrl: 'views/about.html'
      controller: 'AboutCtrl')
    .when '/order', #营地预定
      templateUrl: 'views/order.html'
      controller: 'OrderCtrl'
    .when '/myorder', #显示我的订单
      templateUrl: 'views/myorder.html'
      controller: 'MyorderCtrl'
    .when '/houses', # 营地列表
      templateUrl: 'views/main.html'
      controller: 'MainCtrl'
    .when '/housesurvey', #入住前问卷
      templateUrl: 'views/survey.html'
      controller: 'SurveyCtrl'
    .when '/share', #分享到朋友圈
      templateUrl: 'views/share.html'
      controller: 'ShareCtrl'
    .when '/artist', # 生活艺术家
      templateUrl: 'views/artist.html'
      controller: 'ArtistCtrl'
    .when '/volunteer',  #自愿者招募
      templateUrl: 'views/volunteer.html'
      controller: 'VolunteerCtrl'
    .when '/study', # 学堂
      templateUrl: 'views/study.html'
      controller: 'StudyCtrl'
    .when '/activity',  #活动
      templateUrl: 'views/activity.html'
      controller: 'ActivityCtrl'
    .when '/partner', #执行合伙人招募
      templateUrl: 'views/partner.html'
      controller: 'PartnerCtrl'
    .when '/housedetail/:id', #营地详细01
      templateUrl: 'views/housedetail.html'
      controller: 'HousedetailCtrl'
    .when '/housedetail', #营地详细02，如果无法读取house id，则重定向到 /houses
      templateUrl: 'views/housedetail.html'
      controller: 'HousedetailCtrl'
    .when '/orderreview', #订单的review界面
      templateUrl: 'views/orderreview.html'
      controller: 'OrderreviewCtrl'
    .otherwise redirectTo: '/'

.constant 'API_ENDPOINT', 'http://qa.aghchina.com.cn:3000'
#.constant 'API_ENDPOINT', 'http://localhost:3000'
.constant 'APP_ID', 'wxe2bdce057501817d'
.constant 'APP_SEC', 'c907a867dc3deebff5c0b2c392c77b90'

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

########################
## Simple Service
########################
#UUID generator
#format xxxx-xxxx
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

#show alert messages
#inject flash service
.directive "alertmessage", ['flash', (flash) ->
  (scope, element) ->
    console.log "[directive alertmessage] alert message = '#{flash.getMessage()}'"
    msg = flash.getMessage()
    if msg
      div = angular.element "<div>"
      div.html "<script> Materialize.toast('"+ msg + "', 3000); </script>"
      element.append div
]




