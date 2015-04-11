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
    }).when('/myorder', {
      templateUrl: 'views/myorder.html',
      controller: 'MyorderCtrl'
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
  }).factory('myorderService', function() {
    var orders;
    orders = [];
    return {
      saveOrder: function(order) {
        console.log(order);
        orders.push(order);
      },
      getOrder: function() {
        return orders;
      }
    };
  }).factory('houseService', function() {
    var houses;
    houses = [
      {
        id: 'H001',
        name: '喜乐屋',
        likes: '16',
        price: '1050',
        image: 'images/xile.jpg',
        avator: 'images/yuna.jpg'
      }, {
        id: 'H002',
        name: '向日葵',
        likes: '22',
        price: '850',
        image: 'images/xrk.jpg',
        avator: 'images/avator.jpg'
      }
    ];
    return {
      getHouseList: function() {
        return houses;
      },
      getHouseById: function(id) {
        var h, i, len;
        for (i = 0, len = houses.length; i < len; i++) {
          h = houses[i];
          if (h.id === id) {
            return h;
          }
        }
      }
    };
  }).factory('uuidService', function() {
    return {
      generateUUID: function() {
        var S4, delim;
        delim = "-";
        S4 = function() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + delim + S4();
      }
    };
  }).factory('paramService', function() {
    var saveData;
    saveData = {};
    return {
      set: function(data) {
        return saveData = data;
      },
      get: function() {
        return saveData;
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
        var div, msg;
        console.log("[directive] alert message = '" + (flash.getMessage()) + "'");
        msg = flash.getMessage();
        if (msg) {
          div = angular.element("<div>");
          div.html("<script> Materialize.toast('" + msg + "', 3000); </script>");
          return element.append(div);
        }
      };
    }
  ]);

  return;

}).call(this);
