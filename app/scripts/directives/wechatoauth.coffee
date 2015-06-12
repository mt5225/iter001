'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatOAuth
 # @description
 # check if we have user open_id at hand
###

angular.module('iter001App')
  .directive('wechatoauth', (API_ENDPOINT, wechat, $log, $location, $window)->
    template: ''
    restrict: 'AE'
    link: (scope, element, attrs) ->
      $log.debug "in wechatoauth directive"
      $log.debug "API_ENDPOINT = #{API_ENDPOINT}"
      
      if wechat.getUserInfo().openid
        $log.debug "user info #{wechat.getUserInfo().openid} cached"
        return      
      
      openid = $location.search().openid
      if openid
        $log.debug 'store user info in session'
        wechat.loadUserInfo openid 
        return     
      else
        #usage wechatOAuth="/frontpage"
        backurl = attrs['wechatoauth'] 
        $log.debug "goback url = #{backurl}"
        REDIRECT_URI = $window.encodeURIComponent("#{API_ENDPOINT}/api/useroauth")
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe2bdce057501817d&redirect_uri=#{REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=#{backurl}#wechat_redirect"
        $log.debug "redirect user to auth page with srv api-endpoint as callback"
        $window.location.href = url
        return

  )
   


