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
          div.html("<script>\n  console.log(\"availble days array = \" + '" + daysArray + "');\n  var availableArray = '" + daysArray + "'.split(',');\n  $(function() {\n    $.datepicker.setDefaults($.datepicker.regional[\"zh-TW\"]);\n    $(\"#check-in\").datepicker({\n      beforeShowDay: function(date){\n        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);\n        return [$.inArray(string, availableArray) >= 0 ? true : false, \"\"];\n      }\n    });\n    $(\"#check-out\").datepicker({\n      beforeShowDay: function(date){\n        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);\n        return [$.inArray(string, availableArray) >= 0 ? true : false, \"\"];\n      }\n    });\n  });\n</script>");
          return element.append(div);
        }), function(errorPayload) {
          $log.error('failure loading available days list', errorPayload);
        });
      }
    };
  });

}).call(this);
