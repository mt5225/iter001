'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:pay
 # @description
 # # pay
###
angular.module 'iter001App'
  .directive('pay', ($log, API_ENDPOINT)->
    restrict: 'AE'
    scope: true
    template: '<div></div>'
    link: (scope, element, attrs) ->
      scope.$watch (->
        scope.activatePayDirective
      ), (status) ->       
        $log.debug "activate pay status changed to #{status}, #{scope.openid}, #{scope.totalPrice}, #{scope.orderId}"
        if status
          div = angular.element "<div>"
          div.html """
            <script>
              //todo: mark as pay in progress
              //channel_type:  1. wx_pub  2. alipay_wap 3. alipay
              $.ajax({
                url: "#{API_ENDPOINT}/api/pingplus?channel_type=wx_pub&user_openid=#{scope.openid}&total_price=1&order_number=#{scope.orderId}"
              }).then(function(data) {
                console.log(data);
                charge = data;
                pingpp.createPayment(charge, function(result, error){
                  if (result == "success") {                     
                      alert ("您已成功支付#{scope.totalPrice}元，请通过服务号[客服] -> [订单查询]查看订单状态");
                       $.ajax({
                          url: "#{API_ENDPOINT}/api/orders/#{scope.orderId}",
                          type: "POST",
                          data: JSON.stringify({ status: '支付成功'}),
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
                          data: JSON.stringify({ status: '支付失败'}),
                          contentType: "application/json; charset=utf-8",
                          dataType: "json"
                        }).then(function(data){
                          window.location.href = "/#/close";
                        });                    
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