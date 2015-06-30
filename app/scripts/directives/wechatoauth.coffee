'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatOAuth
 # @description
 # fill userInfo by openid and put in scope
###

angular.module('iter001App')
  .directive('wechatoauth', (API_ENDPOINT, wechat, $log, $location, $window, paramService)->
    template: ''
    restrict: 'AE'
    link: (scope, element, attrs) ->
      $log.debug "in wechatoauth directive"
      $log.debug "API_ENDPOINT = #{API_ENDPOINT}"
      
      if wechat.getUserInfo().openid
        $log.debug "user info #{wechat.getUserInfo().openid} cached, put into session"
        scope.userInfo = wechat.getUserInfo()
        return      
      
      #page is redircted with ?openid = xxx, store in session
      openid = $location.search().openid
      #in local debug mode 
      openid = 'o82BBs8XqUSk84CNOA3hfQ0kNS90'
      if openid
        $log.debug "load user info by openid #{openid}"
        promise = wechat.loadUserInfo openid
        promise.then((payload) ->
          $log.debug "get user info, put in scope.userInfo"
          $log.debug payload.data
          scope.userInfo = payload.data
        )      
      else #call at first time, redirect to wechat oauth with callback
        backurl = attrs['wechatoauth'] 
        if backurl == 'housedetail'
          $log.debug scope.houseId
          backurl = backurl + '/' + scope.houseId
        $log.debug "goback url = #{backurl}"
        REDIRECT_URI = $window.encodeURIComponent("#{API_ENDPOINT}/api/useroauth")
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe2bdce057501817d&redirect_uri=#{REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=#{backurl}#wechat_redirect"
        $log.debug "redirect user to auth page with srv api-endpoint as callback"
        $window.location.href = url
  )
   


