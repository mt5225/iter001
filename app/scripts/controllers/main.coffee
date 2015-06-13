'use strict'

###*
# @ngdoc function
# @name iter001App.controller:MainCtrl
# @description
# # MainCtrl
# Controller of the iter001App
###

angular.module('iter001App')
.controller 'MainCtrl', ($scope, $location, $log, flash, houseservice, paramService) ->

  promise = houseservice.getHouseList()
  promise.then ((payload) ->
    $log.debug payload
    $scope.houses = payload.data
    ), (errorPayload) ->
      $log.error 'failure loading house list', errorPayload
      return

  #user click the order button, navigate the order page
  #with house parameter
  $scope.detail = (house) ->
    paramService.set house
    $location.path '/housedetail'

  ###
  for the slide show
  #todo store in bankend database, also need more org on folders and filenames
  ###

  $scope.slides = houseservice.getSlideShow()

  $scope.direction = 'left'

  $scope.prevSlide = (house)->
    $log.debug "previous slide with house id #{house.id}"
    $scope.direction = 'right';
    if $scope.slides[house.id].currentIndex > 0
      --$scope.slides[house.id].currentIndex
    else
      $scope.slides[house.id].currentIndex = 3
    $log.debug $scope.slides[house.id].currentIndex


  $scope.nextSlide = (house)->
    $log.debug "next slide with house id #{house.id}"
    $scope.direction = 'left';
    if $scope.slides[house.id].currentIndex < 3
       ++$scope.slides[house.id].currentIndex
    else
       $scope.slides[house.id].currentIndex = 0
    $log.debug $scope.slides[house.id].currentIndex


  $scope.isCurrentSlideIndex = (house,index) ->
    $scope.slides[house.id].currentIndex == index

.animation '.slide-animation', ->
  {
  addClass: (element, className, done) ->
    scope = element.scope()
    if className == 'ng-hide'
      finishPoint = element.parent().width()
      finishPoint = -finishPoint if scope.direction != 'right'
      TweenMax.to element, 0.2,
        left: finishPoint
        onComplete: done
    else
      done()
    return

  removeClass: (element, className, done) ->
    scope = element.scope()
    if className == 'ng-hide'
      element.removeClass 'ng-hide'
      startPoint = element.parent().width()
      startPoint = -startPoint if scope.direction == 'right'
      TweenMax.set element, {left: startPoint}
      TweenMax.to element, 0.2,
        left: 0
        onComplete: done
    else
      done()
    return

  }


