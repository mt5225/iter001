'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:wechatshare
 # @description
 # # wechatshare
###
angular.module('iter001App')
  .directive('wechatshare', (WEB_ENDPOINT)->
    template: '<div></div>'
    restrict: 'EA'
    link: (scope, element, attrs) ->
      console.log '[wechatshare directive]'
      #element.text 'this is the wechatshare directive'
      scope.$watch (->
        scope.house
      ), (status) ->  
        if scope.house?
          house = scope.house
          div = angular.element "<div>"
          div.html """
          <script>
            wx.onMenuShareAppMessage({
                  title: '#{house.name}', // 分享标题
                  desc: '#{house.description}', // 分享描述
                  link: '#{WEB_ENDPOINT}/#/housedetail/#{house.id}', // 分享链接
                  imgUrl: '#{house.image}', // 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function() {
                  },
                  cancel: function() {
                      // 用户取消分享后执行的回调函数
                  }
                });
            wx.onMenuShareTimeline({
                  title: '#{house.name}', // 分享标题
                  link: '#{WEB_ENDPOINT}/#/housedetail/#{house.id}', // 分享链接
                  imgUrl: '#{house.image}', // 分享图标
                  success: function () { 
                      
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () { 
                      // 用户取消分享后执行的回调函数
                     
                  }
                });
          </script>
          """
          element.append div
        else
          div = angular.element "<div>"
          div.html = """
          <script type="text/javascript">
            wx.onMenuShareAppMessage({
                title: '漫生活部落', // 分享标题
                desc: '那株久远到无法考证年代的香樟树，那湾清澈可见底的涓涓溪水，那抹夜色中的草长莺飞衍生野趣。点击进入漫生活 ...   客服电话 0571-64668358', // 分享描述
                link: '#{WEB_ENDPOINT}', // 分享链接
                imgUrl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/DEV/Others/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwithout%20name.jpg', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {                   
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数                  
                }
            });
            wx.onMenuShareTimeline({
                title: '漫生活部落', // 分享标题
                link: '#{WEB_ENDPOINT}', // 分享链接
                imgUrl: 'http://aghpic.oss-cn-shenzhen.aliyuncs.com/wechatapp/DEV/Others/%E7%9F%B3%E8%88%8D%E9%A6%99%E6%A8%9Fwithout%20name.jpg', // 分享图标
                success: function () { 
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () { 
                    // 用户取消分享后执行的回调函数                   
                }
            });
          </script>
          """
          element.append div
  )
