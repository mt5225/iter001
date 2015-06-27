(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.surveycheck
    * @description
    * # surveycheck
    * check if user have fill the survey before place order
   */
  angular.module('iter001App').service('surveycheck', function($log, $http, API_ENDPOINT) {
    return {
      check: function(openid) {
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/surveys/" + openid
        }).success(function(data) {
          $log.debug("get sign data success");
          return data;
        }).error(function(data) {
          $log.debug("[surveycheck service] failed to get surveycheck info " + API_ENDPOINT + "/api/surveys/" + openid);
          $log.debug(data);
          return data;
        });
      }
    };
  });

}).call(this);
