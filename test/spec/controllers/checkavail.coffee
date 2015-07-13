'use strict'

describe 'Controller: CheckavailCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  CheckavailCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    CheckavailCtrl = $controller 'CheckavailCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
