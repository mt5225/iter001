'use strict'

describe 'Controller: SurveyCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  SurveyCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    SurveyCtrl = $controller 'SurveyCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
