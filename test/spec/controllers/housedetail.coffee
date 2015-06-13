'use strict'

describe 'Controller: HousedetailCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  HousedetailCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    HousedetailCtrl = $controller 'HousedetailCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
