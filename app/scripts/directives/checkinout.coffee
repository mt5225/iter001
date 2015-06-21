'use strict'

###*
 # @ngdoc directive
 # @name iter001App.directive:checkinout
 # @description
 # # checkinout
###
angular.module 'iter001App'
  .directive('checkinout', ($log, availableroom)->
    restrict: 'EA'
    template: '<div></div>'
    link: (scope, element, attrs) ->
          #get availbe days of the house
      house_id = attrs['checkinout']
      if house_id == '' 
        return
      $log.debug "checkinout directive with house id #{house_id}"
      promise = availableroom.getAvailableDateById(house_id)
      promise.then ((payload) ->
        days = []
        dayPrices = {}
        for item of payload.data #store day and price in array 
          dayPrices[payload.data[item].day] = payload.data[item].info['price']
          days.push payload.data[item].day
        scope.dayPrices = dayPrices  #store available and price infomation in scope
        daysArray = days.toString()
        div = angular.element "<div>"
        div.html """
        <script>
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

          console.log("availble days array = " + '#{daysArray}');
          var allAvailableArray = '#{daysArray}'.split(',');

          //delete days before than today
          var availableArray = []
          todayString = formatDate(new Date())
          for(var i=0; i< allAvailableArray.length; i++) {
            if(allAvailableArray[i] >= todayString){
              availableArray.push(allAvailableArray[i]);
            }
          }
          availableArray = availableArray.sort();
          $(function() {
            $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

            $("#check-in").datepicker({
              beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [$.inArray(string, availableArray) >= 0 ? true : false, ""];
              },
              onSelect: function() {
                $(this).change();
              }
            });
            $('#check-in').on('change',function(e){
              var checkInDay = e.target['value'];
              checkInDay = checkInDay.replace(new RegExp('/', 'g'), '-');
              console.log(checkInDay);

              //////////////////////////////////////
              ////// enable checkou out widget and set available days for checkout
              //////////////////////////////////////
              var checkoutArray = []
              var currentDay = new Date(checkInDay)
              console.log(availableArray);
              for(var i=0; i< availableArray.length; i++) {
                if(availableArray[i] == formatDate(currentDay)) {
                  checkoutArray.push(availableArray[i]);
                  currentDay = currentDay.addDays(1);
                }
              }
              var checkoutArrayAdjust = []
              for (var i=0; i< checkoutArray.length; i++) {
                tmp = (new Date(checkoutArray[i])).addDays(1);
                checkoutArrayAdjust.push(formatDate(tmp));
              }
              console.log("====> checkoutArray <====");
              console.log(checkoutArray);
              $("#check-out").datepicker("destroy");
              $("#check-out").datepicker({
                 beforeShowDay: function(date){
                  var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                  return [$.inArray(string, checkoutArrayAdjust) >= 0 ? true : false, ""];
                 }
                });
              $("#check-out").val('');
              $("#check-out").datepicker("refresh");
              //////////////////////////////////////////
            });
          });
        </script>
        """
        element.append div
        ), (errorPayload) ->
          $log.error 'failure loading available days list', errorPayload
          return      
  )