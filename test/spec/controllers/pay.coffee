'use strict'

describe 'Controller: PayCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  PayCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    PayCtrl = $controller 'PayCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
