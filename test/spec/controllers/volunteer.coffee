'use strict'

describe 'Controller: VolunteerCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  VolunteerCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    VolunteerCtrl = $controller 'VolunteerCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
