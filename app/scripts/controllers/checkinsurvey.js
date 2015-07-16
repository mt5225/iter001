(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:CheckinsurveyCtrl
    * @description
    * # CheckinsurveyCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('CheckinsurveyCtrl', function($scope, $log, $location, paramService, surveyservice, sortByKey) {
    $scope.$watch('userInfo', function() {
      var openid, promise;
      if ($scope.userInfo) {
        openid = $scope.userInfo.openid;
        $log.debug("found openid: " + openid);
        promise = surveyservice.loadByOpenID(openid);
        return promise.then(function(payload) {
          var i, item, len, ref, surveys, t;
          surveys = [];
          ref = payload.data;
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            if (item.type === "入住") {
              surveys.push(item);
            }
          }
          if (surveys.length > 0) {
            t = sortByKey.sort(surveys, 'createDay');
            $log.debug(t);
            paramService.set(t[0]);
            $log.debug("survey data loaded, redirect to survey page");
            return $location.path('/survey');
          } else {
            return $scope.msg = "您尚未提交入住问卷，请通过[服务号］->[营地预定] 完成问卷";
          }
        });
      }
    });
    return $scope.close = function() {
      return $location.path("/close");
    };
  });

}).call(this);
