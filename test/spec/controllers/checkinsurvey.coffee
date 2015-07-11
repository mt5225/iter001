'use strict'

describe 'Controller: CheckinsurveyCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  CheckinsurveyCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    CheckinsurveyCtrl = $controller 'CheckinsurveyCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
