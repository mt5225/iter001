'use strict'

describe 'Directive: validationmessage', ->

  # load the directive's module
  beforeEach module 'iter001App'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<validationmessage></validationmessage>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the validationmessage directive'
