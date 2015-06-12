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
    .otherwise redirectTo: '/'

.constant 'API_ENDPOINT', 'http://qa.aghchina.com.cn:3000'
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

#house service
.factory 'houseService', ->
  #todo put it into backend database
  houses = [
    {id: 'H001', name: '喜乐窝', likes: '16', price: '1050', image: 'images/xile.jpg' , avator: 'images/xielong.jpg',
    description: '红色的主色调、通透的空间、温馨的阁楼...', owner: "Luke Xie", stars: 5}
    {id: 'H002', name: '向日葵', likes: '22', price: '850', image: 'images/xrk.jpg', avator: 'images/xrk_owner_opt.jpg',
    description: '向日葵营地，正如它的花语---勇敢去追求自己想要的幸福。如果...', owner: "Jerry Jiang", stars: 4}
    {id: 'H003', name: '绿茶', likes: '32', price: '1250', image: 'images/greentea.jpg' , avator: 'images/avator.jpg',
    description: '远离城市浮华，步入大自然的怀抱，在上水之间寻找内心的自我...', owner: "阳光男孩", stars: 5}
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




