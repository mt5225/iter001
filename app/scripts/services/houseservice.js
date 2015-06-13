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
          $log.error("[house  service] failed to get houses list from API_ENDPOINT");
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
          $log.error("[house service] fail to get house record from API_ENDPOINT");
          return $log.error(data);
        });
      },
      getSlideShow: function() {
        var slides;
        slides = {
          'H001': {
            currentIndex: 0,
            images: [
              {
                image: 'images/xile.jpg',
                description: 'Image 00'
              }, {
                image: 'images/xile02.jpg',
                description: 'Image 01'
              }, {
                image: 'images/xile03.jpg',
                description: 'Image 02'
              }, {
                image: 'images/xile04.jpg',
                description: 'Image 03'
              }
            ]
          },
          'H002': {
            currentIndex: 0,
            images: [
              {
                image: 'images/xrk.jpg',
                description: 'Image 00'
              }, {
                image: 'images/xrk02.jpg',
                description: 'Image 01'
              }, {
                image: 'images/xrk03.jpg',
                description: 'Image 02'
              }, {
                image: 'images/xrk04.jpg',
                description: 'Image 03'
              }
            ]
          },
          'H003': {
            currentIndex: 0,
            images: [
              {
                image: 'images/greentea.jpg',
                description: 'Image 00'
              }, {
                image: 'images/greentea02.jpg',
                description: 'Image 01'
              }, {
                image: 'images/greentea03.jpg',
                description: 'Image 02'
              }, {
                image: 'images/greentea04.jpg',
                description: 'Image 03'
              }
            ]
          }
        };
        return slides;
      }
    };
  });

}).call(this);
