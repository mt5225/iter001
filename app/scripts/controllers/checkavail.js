(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:CheckavailCtrl
    * @description
    * # CheckavailCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('CheckavailCtrl', function($scope, uuidService, $log, orderService, houseservice, $q, $location, paramService, wechat) {
    var initState;
    initState = function() {
      $scope.showResult = false;
      $scope.showGotoOrder = false;
      $scope.showClose = false;
      return $scope.currentRecord = {};
    };
    $log.debug("CheckavailCtrl controller");
    $log.debug($scope.userInfo);
    $scope.validateMsg = '';
    initState();
    $scope.$on('$routeChangeStart', function(scope, next, current) {
      if (next.$$route.controller !== 'CheckavailCtrl') {
        $('.hasDatepicker').datepicker('hide');
      }
    });
    $scope.hideResultTable = function() {
      return initState();
    };
    return $scope.seachAvail = function() {
      initState();
      $log.debug($scope.checkInDay + " " + $scope.checkOutDay);
      $log.debug($scope.userInfo);
      if (($scope.checkInDay == null) || ($scope.checkOutDay == null) || ($scope.userInfo == null)) {
        $scope.validateMsg = "请输入完整查询信息!|" + uuidService.generateUUID();
      } else if ($scope.checkOutDay <= $scope.checkInDay) {
        $scope.validateMsg = "退房日期不能早于或入住日期|" + uuidService.generateUUID();
      } else {
        houseservice.getHouseList().then((function(payload) {
          var promises;
          promises = _.map(payload.data, function(house) {
            var order;
            order = {};
            order.checkInDay = $scope.checkInDay;
            order.checkOutDay = $scope.checkOutDay;
            order.houseId = house.id;
            order.houseName = house.name;
            order.tribeName = house.tribe;
            order.average_price = house.average_price;
            $log.debug(order);
            return orderService.checkAvailable(order);
          });
          return $q.all(promises).then(function(results) {
            var aArray, i, item, len, t;
            aArray = [];
            for (i = 0, len = results.length; i < len; i++) {
              item = results[i];
              t = {};
              switch (item.data.available) {
                case 'true':
                  t.status = "空闲";
                  break;
                case 'false':
                  t.status = "已订满";
                  break;
                case 'N/A':
                  t.status = "不可预订";
              }
              t.houseInfo = JSON.parse(item.config.data);
              aArray.push(t);
            }
            $scope.availableArray = aArray;
            $log.debug(aArray);
            $scope.showResult = true;
            return $scope.showClose = true;
          });
        }));
      }
      return $scope.gotoOrderPage = function(record) {
        $scope.currentRecord = record;
        if (record.status === "空闲") {
          return houseservice.getHouseById(record.houseInfo.houseId).then((function(payload) {
            var newOrder;
            newOrder = {};
            newOrder.house = payload.data[0];
            newOrder.userInfo = wechat.getUserInfo();
            newOrder.checkInDay = $scope.checkInDay;
            newOrder.checkOutDay = $scope.checkOutDay;
            $log.debug(newOrder);
            paramService.set(newOrder);
            return $location.path("/order");
          }));
        }
      };
    };
  });

}).call(this);
