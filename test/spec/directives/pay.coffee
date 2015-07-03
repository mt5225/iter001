'use strict'

describe 'Directive: pay', ->

  # load the directive's module
  beforeEach module 'iter001App'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<pay></pay>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the pay directive'
