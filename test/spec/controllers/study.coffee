'use strict'

describe 'Controller: StudyCtrl', ->

  # load the controller's module
  beforeEach module 'iter001App'

  StudyCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    StudyCtrl = $controller 'StudyCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(scope.awesomeThings.length).toBe 3
