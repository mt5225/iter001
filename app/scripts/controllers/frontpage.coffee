'use strict'

###*
 # @ngdoc function
 # @name iter001App.controller:FrontpageCtrl
 # @description
 # # FrontpageCtrl
 # Controller of the iter001App
 # @note APP_ID =
###
angular.module('iter001App')
  .controller 'FrontpageCtrl', ($scope, $location, $window, wechat) ->
    $scope.tribes = [
      {image: 'images/lz_opt.jpg'}
      {image: 'images/lztw_opt.jpg'}
      {image: 'images/ss_opt.jpg'}
      {image: 'images/ssxz_opt.jpg'}
    ]

    #get user info from url and store it in wechat service
    userOpenId = $location.search().user_openid
    wechat.loadUserInfo userOpenId

    $scope.ToSurvey = ->
      $location.path "/survey"
#      #redirect user to wechat oauth page
#      #APP_ID = 'wxe2bdce057501817d'
#      APP_ID = 'wx520c15f417810387'
#      #REDITECT_URL = 'http%3A%2F%2Flocalhost%3A9000%2F%23%2Fsurvey'
#      REDITECT_URL = 'http%3A%2F%2Fapple.com'
#      console.log "redirect to user auth page"
#      #HREF = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{APP_ID}&redirect_uri=#{REDITECT_URL}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect"
#      HREF = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{APP_ID}&redirect_uri=http%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
#      #HREF = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{APP_ID}&redirect_uri=#{REDITECT_URL}&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
#      console.log HREF
#      $window.location.href = HREF
