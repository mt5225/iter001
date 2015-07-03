(function() {
  'use strict';

  /**
    * @ngdoc directive
    * @name iter001App.directive:checkinout
    * @description
    * # checkinout
   */
  angular.module('iter001App').directive('checkinout', function($log, availableroom) {
    return {
      restrict: 'EA',
      template: '<div></div>',
      link: function(scope, element, attrs) {
        var house_id, promise;
        house_id = attrs['checkinout'];
        if (house_id === '') {
          return;
        }
        $log.debug("checkinout directive with house id " + house_id);
        promise = availableroom.getAvailableDateById(house_id);
        return promise.then((function(payload) {
          var dayPrices, days, daysArray, div, item;
          days = [];
          dayPrices = {};
          for (item in payload.data) {
            dayPrices[payload.data[item].day] = payload.data[item].info['price'];
            days.push(payload.data[item].day);
          }
          scope.dayPrices = dayPrices;
          daysArray = days.toString();
          div = angular.element("<div>");
          div.html("<script>\n  Date.prototype.addDays = function(days) {\n      var dat;\n      dat = new Date(this.valueOf());\n      dat.setDate(dat.getDate() + days);\n      return dat;\n    };\n\n  formatDate = function(date) {\n    var d, day, month, year;\n    d = new Date(date);\n    month = '' + (d.getMonth() + 1);\n    day = '' + d.getDate();\n    year = d.getFullYear();\n    if (month.length < 2) {\n      month = '0' + month;\n    }\n    if (day.length < 2) {\n      day = '0' + day;\n    }\n    return [year, month, day].join('-');\n  };\n\n  console.log(\"availble days array = \" + '" + daysArray + "');\n  var allAvailableArray = '" + daysArray + "'.split(',');\n\n  //delete days before than today, force utc + 8\n  var availableArray = []\n  //var d = new Date();\n  //var utc = d.getTime() - (d.getTimezoneOffset() * 60000);\n  //var nd = new Date(utc + (3600000*8));\n  var todayString = formatDate(new Date());\n  for(var i=0; i< allAvailableArray.length; i++) {\n    if(allAvailableArray[i] >= todayString){\n      availableArray.push(allAvailableArray[i]);\n    }\n  }\n  availableArray = availableArray.sort();\n  /////////////////\n  // init check-in widget\n  /////////////////\n  $(function() {\n    $.datepicker.setDefaults($.datepicker.regional[\"zh-TW\"]);\n\n    $(\"#check-in\").datepicker({\n      beforeShowDay: function(date){\n        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);\n        return [$.inArray(string, availableArray) >= 0 ? true : false, \"\"];\n      },\n      onSelect: function() {\n        $(this).change();\n      }\n    });\n    $('#check-in').on('change',function(e){\n      var checkInDay = e.target['value'];\n      checkInDay = checkInDay.replace(new RegExp('/', 'g'), '-');\n      console.log(checkInDay);\n\n      //////////////////////////////////////\n      ////// enable checkou out widget and set available days for checkout\n      //////////////////////////////////////\n      var checkoutArray = []\n      var currentDay = new Date(checkInDay)\n      console.log(currentDay.getTimezoneOffset());\n      console.log(availableArray);\n      if(currentDay.getTimezoneOffset() != -480){\n          console.log(\"adjust timezone\");\n          currentDay = currentDay.addDays(1);\n        }\n      for(var i=0; i< availableArray.length; i++) {\n        if(availableArray[i] == formatDate(currentDay)) {\n          checkoutArray.push(availableArray[i]);\n          currentDay = currentDay.addDays(1);\n        }\n      }\n      console.log(checkoutArray);\n      var checkoutArrayAdjust = []\n      for (var i=0; i< checkoutArray.length; i++) {\n        tmp = (new Date(checkoutArray[i])).addDays(1);\n        if(tmp.getTimezoneOffset() != -480){\n          console.log(\"adjust timezone\");\n          tmp = tmp.addDays(1);\n        }\n        checkoutArrayAdjust.push(formatDate(tmp));\n      }\n      console.log(\"====> checkoutArray <====\");\n      console.log(checkoutArray);\n      $(\"#check-out\").datepicker(\"destroy\");\n      $(\"#check-out\").datepicker({\n         beforeShowDay: function(date){\n          var string = jQuery.datepicker.formatDate('yy-mm-dd', date);\n          return [$.inArray(string, checkoutArrayAdjust) >= 0 ? true : false, \"\"];\n         }\n        });\n      $(\"#check-out\").val('');\n      $(\"#check-out\").datepicker(\"refresh\");\n      //////////////////////////////////////////\n    });\n  });\n</script>");
          return element.append(div);
        }), function(errorPayload) {
          $log.error('failure loading available days list', errorPayload);
        });
      }
    };
  });

}).call(this);
