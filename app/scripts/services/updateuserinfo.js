(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.updateuserinfo
    * @description
    * # update user info
    * Service in the iter001App.
   */
  angular.module('iter001App').service('updateuserinfo', function($http, $log, API_ENDPOINT) {
    return {
      update: function(userInfo) {
        return $http({
          method: 'POST',
          url: API_ENDPOINT + "/api/users",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(userInfo),
          dataType: 'json'
        }).success(function(data) {
          $log.info("[userupdate service] userinfo saved to backend success !");
          return $log.debug(data);
        }).error(function(data) {
          $log.error("[userupdate service] failed to save surveyResult");
          return $log.debug(data);
        });
      }
    };
  });

}).call(this);
