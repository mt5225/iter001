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
  angular.module('iter001App', ['ngAria', 'ngCookies', 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/loadwechat.html',
      controller: 'LoadwechatCtrl'
    }).when('/frontpage', {
      templateUrl: 'views/frontpage.html',
      controller: 'FrontpageCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).when('/order', {
      templateUrl: 'views/order.html',
      controller: 'OrderCtrl'
    }).when('/myorder/:orderId', {
      templateUrl: 'views/myorder.html',
      controller: 'MyorderCtrl'
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
    }).when('/pay', {
      templateUrl: 'views/pay.html',
      controller: 'PayCtrl'
    }).when('/checkinsurvey', {
      templateUrl: 'views/checkinsurvey.html',
      controller: 'CheckinsurveyCtrl'
    }).when('/loadwechat', {
      templateUrl: 'views/loadwechat.html',
      controller: 'LoadwechatCtrl'
    }).when('/checkavail', {
      templateUrl: 'views/checkavail.html',
      controller: 'CheckavailCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  }).constant('API_ENDPOINT', 'http://app.aghchina.com.cn:3000').constant('WEB_ENDPOINT', 'http://app.aghchina.com.cn:9000').constant('APP_ID', 'wx2744e355f1816d95').constant('APP_SEC', '41a601d93fc3795d964d08f369ce5b11').factory('flash', function($rootScope) {
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
        delim = "";
        S4 = function() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + delim + S4();
      }
    };
  }).factory('dateService', function() {
    var todayStr;
    Date.prototype.timeNow = function() {
      return (this.getHours() < 10 ? '0' : '') + this.getHours() + ':' + (this.getMinutes() < 10 ? '0' : '') + this.getMinutes() + ':' + (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
    };
    todayStr = function() {
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
      return today = yyyy + '-' + mm + '-' + dd;
    };
    return {
      getToday: function() {
        return todayStr();
      },
      getTodayTime: function() {
        var currentdate, datetime;
        currentdate = new Date;
        return datetime = todayStr() + " " + currentdate.timeNow();
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
  }).factory('sortByKey', function() {
    return {
      sort: function(array, key) {
        return array.sort(function(a, b) {
          var x, y;
          x = a[key];
          y = b[key];
          if (x < y) {
            return 1;
          } else if (x > y) {
            return -1;
          } else {
            return 0;
          }
        });
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
