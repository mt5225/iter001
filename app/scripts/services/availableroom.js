(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.availableroom
    * @description
    * # available room
    * Service in the iter001App.
   */
  angular.module('iter001App').service('availableroom', function($log, $http, API_ENDPOINT) {
    console.log("[api endpoint] " + API_ENDPOINT);
    return {
      getAvailableDateById: function(id) {
        if (id) {
          $log.debug("loading available dates by house id=" + id);
          return $http({
            method: 'GET',
            url: API_ENDPOINT + "/api/available/" + id
          }).success(function(data) {
            return data;
          }).error(function(data) {
            $log.error("[availableroom service] fail to get available room record from " + API_ENDPOINT);
            return $log.error(data);
          });
        } else {
          return {};
        }
      }
    };
  });

}).call(this);
