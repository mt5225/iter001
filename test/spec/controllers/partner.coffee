'use strict'

describe 'Controller: PartnerCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  PartnerCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    PartnerCtrl = $controller 'PartnerCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
