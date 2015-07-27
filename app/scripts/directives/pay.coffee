'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:pay
 # @description
 # # pay
###
angular.module 'iter001App'
  .directive('pay', ($log, API_ENDPOINT, WEB_ENDPOINT)->
    restrict: 'AE'
    scope: true
    template: '<div></div>'
    link: (scope, element, attrs) ->
      scope.$watch (->
        scope.activatePayDirective
      ), (status) ->       
        $log.debug "activate pay status changed to #{status}, #{scope.openid}, #{scope.totalPrice}, #{scope.orderId}"
        #prepare for pay success message
        $log.debug scope.orderDetails
        msg = {}
        msg.touser = scope.openid
        msg.template_name = "book_success"
        msg.url = "#{WEB_ENDPOINT}/static/map.html?tribe=#{scope.orderDetails.house.tribe}"
        msg.data = 
          first: value: "恭喜您预订#{scope.orderDetails.houseName}成功，订单号为#{scope.orderDetails.orderId}, 欢迎来#{scope.orderDetails.houseName}"
          hotelName: value: "#{scope.orderDetails.house.tribe}"
          roomName: value: "#{scope.orderDetails.house.name}"
          pay: value: "#{scope.orderDetails.totalPrice}"
          date: value: "#{scope.orderDetails.checkInDay}"
          remark: value: "点击查看驾车路线，漫生活管家联系方式 138101010101"
        msgStr = JSON.stringify msg
        $log.debug msgStr
        if status
          div = angular.element "<div>"
          div.html """
            <script>
              //todo: mark as pay in progress
              //channel_type:  1. wx_pub  2. alipay_wap 3. alipay
              $.ajax({
                url: "#{API_ENDPOINT}/api/pingplus?channel_type=wx_pub&user_openid=#{scope.openid}&total_price=#{scope.totalPrice}&order_number=#{scope.orderId}"
              }).then(function(data) {
                console.log(data);
                charge = data;
                pingpp.createPayment(charge, function(result, error){
                  if (result == "success") {                     
                      alert ("您已成功支付#{scope.totalPrice}元，请通过服务号[客服] -> [订单查询]查看订单状态");
                       $.ajax({
                          url: "#{API_ENDPOINT}/api/orders/#{scope.orderId}",
                          type: "POST",
                          data: JSON.stringify({ status: '预订成功'}),
                          contentType: "application/json; charset=utf-8",
                          dataType: "json"
                        }).then(function(data){
                          window.location.href = "/#/close";
                        }); 
                  } else if (result == "fail") {                     
                      alert ("支付失败, 请通过服务号[客服] -> [订单查询]继续完成支付或联系客服 010-88888888");
                      $.ajax({
                          url: "#{API_ENDPOINT}/api/orders/#{scope.orderId}",
                          type: "POST",
                          //data: JSON.stringify({ status: '支付失败'}),
                          data: JSON.stringify({ status: '预订成功'}),
                          contentType: "application/json; charset=utf-8",
                          dataType: "json"
                        }).then(function(data){
                          window.location.href = "/#/close";
                        }); 
                      $('#PayCtrl').scope().notifyUser('#{msgStr}');
                  } else if (result == "cancel") {                     
                      alert ("支付已取消! 请通过服务号[客服] -> [订单查询]继续完成支付或联系客服 010-88888888");
                       $.ajax({
                          url: "#{API_ENDPOINT}/api/orders/#{scope.orderId}",
                          type: "POST",
                          data: JSON.stringify({ status: '支付被取消'}),
                          contentType: "application/json; charset=utf-8",
                          dataType: "json"
                        }).then(function(data){
                          window.location.href = "/#/close";
                        });
                  }
                });
              });
            </script>
          """
          element.append div
  )