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
  }).factory('flash', function($rootScope) {
    var currentMessage, queue;
    queue = [];
    currentMessage = '';
    $rootScope.$on('$routeChangeSuccess', function() {
      currentMessage = queue.shift() || '';
      return console.log("route change with message '" + currentMessage + "'");
    });
    return {
      setMessage: function(message) {
        queue.push(message);
      },
      getMessage: function() {
        console.log("in getMessage with '" + currentMessage + "'");
        return currentMessage;
      }
    };
  }).directive("navbar", [
    '$location', function(location) {
      return function(scope, element) {
        var navbar_content, url;
        url = location.path();
        console.log("url =  '" + url + "'");
        navbar_content = element.find('#navbar')[0];
        if (url === '/order') {
          return navbar_content.style.display = 'none';
        } else {
          return navbar_content.style.display = 'block';
        }
      };
    }
  ]).directive("alertmessage", [
    'flash', function(flash) {
      return function(scope, element) {
        var div;
        console.log("[directive] alert message = '" + (flash.getMessage()) + "'");
        div = angular.element("<div>");
        div.attr('class', 'Alert');
        element.append(div);
        return div.append(angular.element("<p>").text(flash.getMessage()));
      };
    }
  ]);

  return;

}).call(this);
