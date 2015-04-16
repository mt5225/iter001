(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:SurveyCtrl
    * @description
    * # SurveyCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('SurveyCtrl', function($scope, $location) {
    return $scope.FinishSurvey = function() {
      return $location.path('/houses');
    };
  });

}).call(this);
