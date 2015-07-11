(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.surveyservice
    * @description
    * # surveyservice
    * Service in the iter001App.
   */
  angular.module('iter001App').service('surveyservice', function($http, $log, wechat, API_ENDPOINT, dateService) {
    return {
      save: function(surveyResult) {
        surveyResult.createDay = dateService.getTodayTime();
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
      },
      loadByOpenID: function(openid) {
        $log.debug("load user survey by " + openid + " ");
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/surveys/" + openid
        }).success(function(data) {
          return data;
        }).error(function(data) {
          $log.error("[survey service] fail to get survey record from " + API_ENDPOINT);
          return $log.error(data);
        });
      }
    };
  });

}).call(this);
