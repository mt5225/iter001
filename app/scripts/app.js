(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name iter001App
   * @description
   * # iter001App
  #
   * Main module of the application.
   */
  angular.module('iter001App', ['ngAnimate', 'ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).when('/order', {
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }).directive("navbar", [
    '$location', function(location) {
      return function(scope, element) {
        var navbar_content, order, url;
        url = location.path();
        console.log("in navbar url =  '" + url + "'");
        navbar_content = element.find('#navbar_content')[0];
        console.log(navbar_content);
        order = element.find('#place_order')[0];
        console.log(order);
        if (url === '/order') {
          order.style.display = 'block';
          return navbar_content.style.display = 'none';
        } else {
          navbar_content.style.display = 'block';
          return order.style.display = 'none';
        }
      };
    }
  ]);

  return;

}).call(this);
