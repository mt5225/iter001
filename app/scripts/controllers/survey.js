(function() {
  'use strict';

  /**
    * @ngdoc function
    * @name iter001App.controller:SurveyCtrl
    * @description
    * # SurveyCtrl
    * Controller of the iter001App
   */
  angular.module('iter001App').controller('SurveyCtrl', function($scope, $location, $log, uuidService, wechat, surveycheck, surveyservice, paramService) {
    var oldSurvey, updateOldSurvey, userInfo;
    userInfo = wechat.getUserInfo();
    $scope.nickname = userInfo.nickname;
    oldSurvey = paramService.get();
    updateOldSurvey = false;
    $scope.validateMsg = '';
    if (oldSurvey.type != null) {
      $log.debug("update old survey");
      $scope.survey = oldSurvey;
      updateOldSurvey = true;
    }
    return $scope.FinishSurvey = function() {
      var k, questionsAnswered, survey;
      survey = $scope.survey;
      questionsAnswered = 0;
      for (k in survey) {
        if (k.indexOf('question') > -1) {
          questionsAnswered++;
        }
      }
      $log.debug("questions answered = " + questionsAnswered);
      if (questionsAnswered >= 8) {
        if (updateOldSurvey) {
          delete survey['_id'];
          surveyservice.save(survey);
          return $location.path('/close');
        } else {
          survey.userinfo = userInfo;
          survey.type = "入住";
          surveyservice.save(survey);
          return $location.path('/order');
        }
      } else {
        $scope.validateMsg = "请完成所有问题|" + uuidService.generateUUID();
        $log.debug($scope.validateMsg);
      }
    };
  });

}).call(this);
