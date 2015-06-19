(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.surveyservice
    * @description
    * # surveyservice
    * Service in the iter001App.
   */
  var getToday;

  getToday = function() {
    var dd, mm, today, yyyy;
    today = new Date;
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  };

  angular.module('iter001App').service('surveyservice', function($http, $log, wechat, API_ENDPOINT) {
    return {
      save: function(surveyResult) {
        surveyResult.userinfo = wechat.getUserInfo();
        if (!surveyResult.userinfo['openid']) {
          surveyResult.userinfo['openid'] = 'unknown';
        }
        surveyResult.createDay = getToday();
        $log.debug("[survey service] save survey result to backend " + (JSON.stringify(surveyResult)));
        return $http({
          method: 'POST',
          url: API_ENDPOINT + "/api/surveys",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(surveyResult),
          dataType: 'json'
        }).success(function(data) {
          $log.info("[survey service] surveyResult saved to backend success !");
          return $log.debug(data);
        }).error(function(data) {
          $log.error("[survey service] failed to save surveyResult");
          return $log.debug(data);
        });
      }
    };
  });

}).call(this);
