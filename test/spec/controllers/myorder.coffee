'use strict'

describe 'Controller: MyorderCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  MyorderCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    MyorderCtrl = $controller 'MyorderCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
