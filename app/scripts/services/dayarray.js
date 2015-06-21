(function() {
  'use strict';

  /**
    * @ngdoc service
    * @name iter001App.dayarray
    * @description
    * # dayarray
    * Service in the iter001App.
   */
  var formatDate, getDates;

  Date.prototype.addDays = function(days) {
    var dat;
    dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

  formatDate = function(date) {
    var d, day, month, year;
    d = new Date(date);
    month = '' + (d.getMonth() + 1);
    day = '' + d.getDate();
    year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  };

  getDates = function(startDate, stopDate) {
    var currentDate, dateArray;
    dateArray = new Array;
    currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(formatDate(new Date(currentDate)));
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  };

  angular.module('iter001App').service('dayarray', function() {
    return {
      getDayArray: function(startDayString, endDayString) {
        var endDate, startDate;
        startDate = new Date(startDayString);
        endDate = new Date(endDayString);
        return getDates(startDate, endDate);
      },
      getNextDay: function(currentDate) {
        currentDate = new Date(currentDate);
        return formatDate(currentDate.addDays(1));
      }
    };
  });

}).call(this);
