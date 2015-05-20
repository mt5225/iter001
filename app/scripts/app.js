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
      templateUrl: 'views/frontpage.html',
      controller: 'FrontpageCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).when('/order', {
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl'
    }).when('/myorder', {
      templateUrl: 'views/myorder.html',
      controller: 'MyorderCtrl'
    }).when('/houses', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/survey', {
      templateUrl: 'views/survey.html',
      controller: 'SurveyCtrl'
    }).when('/share', {
      templateUrl: 'views/share.html',
      controller: 'ShareCtrl'
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
        name: '喜乐窝',
        likes: '16',
        price: '1050',
        image: 'images/xile.jpg',
        avator: 'images/xielong.jpg',
        description: '红色的主色调、通透的空间、温馨的阁楼...',
        owner: "Luke Xie",
        stars: 5
      }, {
        id: 'H002',
        name: '向日葵',
        likes: '22',
        price: '850',
        image: 'images/xrk.jpg',
        avator: 'images/xrk_owner_opt.jpg',
        description: '向日葵营地，正如它的花语---勇敢去追求自己想要的幸福。如果...',
        owner: "Jerry Jiang",
        stars: 4
      }, {
        id: 'H003',
        name: '绿茶',
        likes: '32',
        price: '1250',
        image: 'images/greentea.jpg',
        avator: 'images/avator.jpg',
        description: '远离城市浮华，步入大自然的怀抱，在上水之间寻找内心的自我...',
        owner: "阳光男孩",
        stars: 5
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
  }).directive("alertmessage", [
    'flash', function(flash) {
      return function(scope, element) {
        var div, msg;
        console.log("[directive alertmessage] alert message = '" + (flash.getMessage()) + "'");
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
