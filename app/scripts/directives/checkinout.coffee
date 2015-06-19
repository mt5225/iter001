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
          console.log("availble days array = " + '#{daysArray}');
          var availableArray = '#{daysArray}'.split(',');
          $(function() {
            $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
            $("#check-in").datepicker({
              beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [$.inArray(string, availableArray) >= 0 ? true : false, ""];
              }
            });
            $("#check-out").datepicker({
              beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [$.inArray(string, availableArray) >= 0 ? true : false, ""];
              }
            });
          });
        </script>
        """
        element.append div
        ), (errorPayload) ->
          $log.error 'failure loading available days list', errorPayload
          return      
  )