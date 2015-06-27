(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:VolunteerCtrl
    * @description
    * # VolunteerCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('VolunteerCtrl', function($scope, $log, flash, $location, surveyservice, wechat) {
    $scope.currentShow = 'survey';
    $scope.survey = {
      type: '志愿者',
      question3: '过程',
      question4: '城市',
      question9: '空闲时间参与'
    };
    $scope.switchToSurvey = function() {
      $scope.currentShow = 'survey';
      return $scope.$evalAsync();
    };
    $scope.finishSurvey = function() {
      $scope.currentShow = 'finish';
      $scope.$evalAsync();
      $scope.survey.userInfo = wechat.getUserInfo();
      return surveyservice.save($scope.survey);
    };
    $scope.gotoFrontPage = function() {
      return $location.path("/");
    };
    return $scope.closeWindow = function() {
      return $location.path("/close");
    };
  });

}).call(this);
