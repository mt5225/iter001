(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, orderService, $location, $route, $anchorScroll, paramService, wechat, $routeParams) {
    var dataloaded, msgOrderCancel;
    dataloaded = false;
    $scope.orderId = null;
    $scope.$watch('userInfo', function() {
      var openid, promise;
      if ($scope.userInfo && !dataloaded) {
        openid = $scope.userInfo.openid;
        $log.debug("found openid: " + openid);
        if ($routeParams.orderId != null) {
          promise = orderService.queryOrderById($routeParams.orderId);
          return promise.then(function(payload) {
            paramService.set(payload.data[0]);
            return $location.path("pay");
          });
        } else {
          promise = orderService.queryOrder(openid);
          return promise.then(function(payload) {
            $scope.orders = payload.data;
            dataloaded = true;
            return $log.debug("order data loaded");
          });
        }
      }
    });
    $scope.close = function() {
      return $location.path("/close");
    };
    $scope.refresh = function() {
      return $route.reload();
    };
    $scope.showOrderDetail = function(order) {
      $log.debug("show order details");
      $scope.orderdetail = order;
      $scope.orderId = order.orderId;
      $scope.showdetail = true;
      $('html, body').animate({
        scrollTop: $("#bottom").offset().top
      }, 1000);
    };
    $scope.allowPay = function(orderdetail) {
      var ref, show;
      show = false;
      if (orderdetail != null) {
        show = (ref = orderdetail.status) === '支付失败' || ref === '支付已取消' || ref === '已提交';
      }
      return show;
    };
    $scope.allowCancel = function(orderdetail) {
      var ref, show;
      show = false;
      if (orderdetail != null) {
        show = (ref = orderdetail.status) !== "订单取消" && ref !== "预订成功";
      }
      return show;
    };
    $scope.gotoPay = function(orderdetail) {
      $log.debug(orderdetail);
      paramService.set(orderdetail);
      return $location.path("/pay");
    };
    msgOrderCancel = function(orderDetails) {
      var item, msg;
      msg = {};
      msg.touser = $scope.userInfo.openid;
      msg.template_name = "order_cancel";
      msg.url = "http://qa.aghchina.com.cn:9000/#/myorder?openid=" + msg.touser;
      msg.data = {
        first: {
          value: "您的" + orderDetails.houseName + "订单已取消"
        },
        HotelName: {
          value: "" + orderDetails.houseName
        },
        CheckInDate: {
          value: "" + orderDetails.checkInDay
        },
        CheckOutDate: {
          value: "" + orderDetails.checkOutDay
        },
        remark: {
          value: "编号为" + orderDetails.orderId + " 的订单已成功取消"
        }
      };
      for (item in msg.data) {
        msg.data[item].color = "#01579b";
      }
      $log.debug(msg);
      return wechat.sendMessage(msg);
    };
    return $scope.cancelOrder = function(orderdetail) {
      var promise;
      promise = orderService.cancelOrder(orderdetail);
      return promise.then(function(payload) {
        $log.debug(payload);
        orderdetail.status = "订单取消";
        $scope.orderdetail = orderdetail;
        msgOrderCancel(orderdetail);
        return $scope.showdetail = true;
      });
    };
  });

}).call(this);
