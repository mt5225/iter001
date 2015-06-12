'use strict'

describe 'Controller: ActivityCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  ActivityCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ActivityCtrl = $controller 'ActivityCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
