(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.houseservice
    * @description
    * # houseservice
    * Service in the iter001App.
   */
  angular.module('iter001App').service('houseservice', function($log, $http, API_ENDPOINT) {
    return {
      getHouseList: function() {
        $log.debug("loading houses list by $http");
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/houses"
        }).success(function(data) {
          return data;
        }).error(function(data) {
          $log.error("[house  service] failed to get houses list from " + API_ENDPOINT);
          return $log.error(data);
        });
      },
      getHouseById: function(id) {
        $log.debug("loading house id=" + id);
        return $http({
          method: 'GET',
          url: API_ENDPOINT + "/api/houses/" + id
        }).success(function(data) {
          return data;
        }).error(function(data) {
          $log.error("[house service] fail to get house record from " + API_ENDPOINT);
          return $log.error(data);
        });
      }
    };
  });

}).call(this);
