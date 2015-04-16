'use strict'

describe 'Controller: FrontpageCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  FrontpageCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    FrontpageCtrl = $controller 'FrontpageCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
