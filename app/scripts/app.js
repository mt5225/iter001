(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name iter001App
   * @description
   * # iter001App
   *
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
    }).when('/housesurvey', {
      templateUrl: 'views/survey.html',
      controller: 'SurveyCtrl'
    }).when('/share', {
      templateUrl: 'views/share.html',
      controller: 'ShareCtrl'
    }).when('/artist', {
      templateUrl: 'views/artist.html',
      controller: 'ArtistCtrl'
    }).when('/volunteer', {
      templateUrl: 'views/volunteer.html',
      controller: 'VolunteerCtrl'
    }).when('/study', {
      templateUrl: 'views/study.html',
      controller: 'StudyCtrl'
    }).when('/activity', {
      templateUrl: 'views/activity.html',
      controller: 'ActivityCtrl'
    }).when('/partner', {
      templateUrl: 'views/partner.html',
      controller: 'PartnerCtrl'
    }).when('/housedetail/:id', {
      templateUrl: 'views/housedetail.html',
      controller: 'HousedetailCtrl'
    }).when('/housedetail', {
      templateUrl: 'views/housedetail.html',
      controller: 'HousedetailCtrl'
    }).when('/orderreview', {
      templateUrl: 'views/orderreview.html',
      controller: 'OrderreviewCtrl'
    }).when('/close', {
      templateUrl: 'views/close.html'
    }).otherwise({
      redirectTo: '/'
    });
  }).constant('API_ENDPOINT', 'http://qa.aghchina.com.cn:3000').constant('APP_ID', 'wxe2bdce057501817d').constant('APP_SEC', 'c907a867dc3deebff5c0b2c392c77b90').factory('flash', function($rootScope) {
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
  }).factory('dateService', function() {
    return {
      getToday: function() {
        var dd, mm, today, yyyy;
        today = new Date;
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        return today;
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

}).call(this);
