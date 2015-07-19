(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:HousedetailCtrl
    * @description
    * # HousedetailCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('HousedetailCtrl', function($scope, paramService, $routeParams, houseservice, wechat, $location, $log, surveycheck) {
    $scope.$watch('userInfo', function() {
      var house, promise;
      $log.debug("userInfo value changed!");
      if ($scope.userInfo) {
        $log.debug("check if house is stored in paramService");
        house = paramService.get();
        $scope.imageArray = {};
        $scope.imageArray['house_pic'] = {
          _Index: 0,
          img: house.house_pic_list
        };
        $scope.imageArray['owner_pic'] = {
          _Index: 0,
          img: house.owner_pic_list
        };
        $scope.imageArray['facility_pic'] = {
          _Index: 0,
          img: house.facility_pic_list
        };
        $log.debug($routeParams.id);
        if (house.id) {
          return $scope.house = house;
        } else if ($routeParams.id == null) {
          return $location.path("/houses");
        } else {
          promise = houseservice.getHouseById($routeParams.id);
          return promise.then((function(payload) {
            $log.debug(payload.data);
            $scope.house = payload.data[0];
            return paramService.set(payload.data[0]);
          }), function(errorPayload) {
            $log.error('failure loading house detail', errorPayload);
          });
        }
      }
    });
    $scope.next = function() {
      var promise, userInfo;
      userInfo = wechat.getUserInfo();
      promise = surveycheck.check(userInfo.openid);
      return promise.then((function(payload) {
        var i, len, ref, survey;
        $log.debug(payload.data);
        ref = payload.data;
        for (i = 0, len = ref.length; i < len; i++) {
          survey = ref[i];
          $log.debug(survey.type);
          if (survey.type === '入住') {
            $location.path('/order');
            return;
          }
        }
        return $location.path("/survey");
      }), function(errorPayload) {
        return $log.error('failure loading surveycheck detail', errorPayload);
      });
    };
    $scope.close = function() {
      return $location.path("/");
    };
    $scope.isActive = function(kind, index) {
      return $scope.imageArray[kind]._Index === index;
    };
    $scope.showPrev = function(kind) {
      $scope.imageArray[kind]._Index = $scope.imageArray[kind]._Index - 1;
      if ($scope.imageArray[kind]._Index < 0) {
        $scope.imageArray[kind]._Index = $scope.imageArray[kind].img.length - 1;
      }
      $log.debug("prev " + $scope.imageArray[kind]._Index);
    };
    return $scope.showNext = function(kind) {
      $scope.imageArray[kind]._Index = $scope.imageArray[kind]._Index + 1;
      if ($scope.imageArray[kind]._Index > ($scope.imageArray[kind].img.length - 1)) {
        $scope.imageArray[kind]._Index = 0;
      }
      $log.debug("next " + $scope.imageArray[kind]._Index);
    };
  });

}).call(this);
