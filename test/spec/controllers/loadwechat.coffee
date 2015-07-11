'use strict'

describe 'Controller: LoadwechatCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  LoadwechatCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    LoadwechatCtrl = $controller 'LoadwechatCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
