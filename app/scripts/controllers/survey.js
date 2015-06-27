(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:SurveyCtrl
    * @description
    * # SurveyCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('SurveyCtrl', function($scope, $location, $log, wechat, surveycheck, surveyservice) {
    var userInfo;
    userInfo = wechat.getUserInfo();
    $scope.nickname = userInfo.nickname;
    return $scope.FinishSurvey = function() {
      var survey;
      survey = $scope.survey;
      survey.userInfo = userInfo;
      survey.type = "入住";
      surveyservice.save(survey);
      return $location.path('/order');
    };
  });

}).call(this);
