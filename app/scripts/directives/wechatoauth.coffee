'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatOAuth
 # @description
 # check if we have user open_id at hand
###

angular.module('iter001App')
  .directive('wechatoauth', (API_ENDPOINT, wechat, $log, $location, $window, paramService)->
    template: ''
    restrict: 'AE'
    link: (scope, element, attrs) ->
      $log.debug "in wechatoauth directive"
      $log.debug "API_ENDPOINT = #{API_ENDPOINT}"
      
      if wechat.getUserInfo().openid
        $log.debug "user info #{wechat.getUserInfo().openid} cached"
        return      
      
      #page is redircted with ?openid = xxx, store in session
      openid = $location.search().openid
      if openid
        $log.debug 'load user info by openid'
        wechat.loadUserInfo openid      
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
        return
  )
   


