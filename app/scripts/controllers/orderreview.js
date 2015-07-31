(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:OrderreviewCtrl
    * @description
    * # OrderreviewCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('OrderreviewCtrl', function($scope, $log, $location, wechat, paramService, dayarray, orderService, WEB_ENDPOINT) {
    var bookingArray, bookingDayPriceArray, dayprice, i, item, len, msgResvSuccess, orderDetails, re, totalPrice;
    $log.debug("===> OrderreviewCtrl <===");
    $scope.currentShow = "orderReview";
    if (!paramService.get().house) {
      $location.path("/houses");
    }
    orderDetails = paramService.get();
    $log.debug(orderDetails);
    re = /\//g;
    $scope.checkInDay = orderDetails.checkInDay.replace(re, '-');
    $scope.checkOutDay = orderDetails.checkOutDay.replace(re, '-');
    $scope.house = orderDetails.house;
    bookingDayPriceArray = [];
    bookingArray = dayarray.getDayArray(orderDetails.checkInDay, orderDetails.checkOutDay);
    bookingArray.pop();
    $log.debug(bookingArray);
    totalPrice = 0;
    $log.debug("<-- day price list [ALL] in orderDetails -->");
    $log.debug(orderDetails.dayPrices);
    for (i = 0, len = bookingArray.length; i < len; i++) {
      item = bookingArray[i];
      dayprice = {};
      dayprice.day = item;
      if (orderDetails.dayPrices[item] != null) {
        dayprice.price = orderDetails.dayPrices[item];
        totalPrice = totalPrice + parseInt(dayprice.price);
        bookingDayPriceArray.push(dayprice);
      }
    }
    $log.debug(bookingDayPriceArray);
    $scope.bookingDayPriceArray = bookingDayPriceArray;
    $scope.totalPrice = totalPrice;
    msgResvSuccess = function(orderDetails) {
      var msg;
      msg = {};
      msg.touser = orderDetails.userInfo.openid;
      msg.template_name = "resv_success";
      msg.url = WEB_ENDPOINT + "/#/myorder/" + orderDetails.orderId + "?openid=" + msg.touser;
      msg.data = {
        first: {
          value: "您有最新订单，请及时处理"
        },
        keyword1: {
          value: "" + orderDetails.house.tribe
        },
        keyword2: {
          value: "" + orderDetails.houseName
        },
        keyword3: {
          value: "入住日期" + orderDetails.checkInDay + "，退房日期" + orderDetails.checkOutDay
        },
        keyword4: {
          value: "1"
        },
        keyword5: {
          value: orderDetails.totalPrice + "元"
        },
        remark: {
          value: "订单号为" + orderDetails.orderId + ",请在24小时内完成支付，否则订单会被系统自动取消，支付请点击本消息"
        }
      };
      for (item in msg.data) {
        msg.data[item].color = "#01579b";
      }
      $log.debug(msg);
      return wechat.sendMessage(msg);
    };
    $scope.submitOrder = function() {
      var promise;
      paramService.set({
        submitOrder: true
      });
      $scope.currentShow = "submitResult";
      orderDetails.houseId = orderDetails.house['id'];
      orderDetails.houseName = orderDetails.house['name'];
      orderDetails.totalPrice = totalPrice;
      orderDetails.priceByDayArray = JSON.stringify(bookingDayPriceArray);
      promise = orderService.checkAvailable(orderDetails);
      return promise.then(function(payload) {
        $log.debug(payload.data);
        if (payload.data.available === 'false') {
          $scope.payMessage = "很抱歉，" + orderDetails.houseName + "已经被人捷足先登了！";
          return $scope.$evalAsync();
        } else {
          promise = orderService.saveOrder(orderDetails);
          return promise.then((function(payload) {
            $scope.submitResult = "success";
            $log.debug(payload);
            $scope.payMessage = "感谢预订" + $scope.house.name + "，订单号为" + payload.data['orderId'] + " 。请在24小时内完成支付，否则预订会被系统自动取消";
            $scope.$evalAsync();
            return msgResvSuccess(orderDetails);
          }), function(errorPayload) {
            $log.error('failure to save submit Order', errorPayload);
            return $scope.payMessage = "订单提交失败!";
          });
        }
      });
    };
    $scope.close = function() {
      return $location.path("/close");
    };
    $scope.back = function() {
      return $location.path("/order");
    };
    $scope.gotoPay = function() {
      paramService.set(orderDetails);
      return $location.path("/pay");
    };
    return $scope.showBarcode = function() {
      return false;
    };
  });

}).call(this);
