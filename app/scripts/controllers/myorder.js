(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:MyorderCtrl
    * @description get user order list
    * # MyorderCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('MyorderCtrl', function($scope, $log, orderService, $location, $route, $anchorScroll, paramService, wechat, $routeParams, WEB_ENDPOINT, houseservice, $window) {
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
            var orderDetails;
            orderDetails = payload.data[0];
            return houseservice.getHouseById(orderDetails.houseId).then((function(payload) {
              orderdetail.house = payload.data[0];
              paramService.set(orderDetails);
              return $location.path("pay");
            }));
          });
        } else {
          promise = orderService.queryOrder(openid);
          return promise.then(function(payload) {
            var sortedArray;
            sortedArray = payload.data;
            sortedArray.sort(function(t1, t2) {
              switch (t1.createDay > t2.createDay) {
                case true:
                  return -1;
                case false:
                  return 1;
              }
            });
            $scope.orders = sortedArray;
            $log.debug(sortedArray);
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
    $scope.gotoPay = function(orderDetails) {
      var promise;
      $log.debug(orderDetails);
      promise = houseservice.getHouseById(orderDetails.houseId);
      return promise.then((function(payload) {
        orderDetails.house = payload.data[0];
        paramService.set(orderDetails);
        return $location.path("/pay");
      }));
    };
    msgOrderCancel = function(orderDetails) {
      var item, msg;
      msg = {};
      msg.touser = $scope.userInfo.openid;
      msg.template_name = "order_cancel";
      msg.url = WEB_ENDPOINT + "/#/myorder?openid=" + msg.touser;
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
    $scope.cancelOrder = function(orderdetail) {
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
    return $scope.map = function(orderdetail) {
      var promise;
      $log.debug(orderdetail);
      promise = houseservice.getHouseById(orderdetail.houseId);
      return promise.then((function(payload) {
        var house;
        house = payload.data[0];
        return $window.location.href = WEB_ENDPOINT + "/static/map.html?tribe=" + house.tribe;
      }));
    };
  });

}).call(this);
