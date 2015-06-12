'use strict'

describe 'Directive: wechatjsInit', ->

  # load the directive's module
  beforeEach module 'iter001App'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<wechatjs-init></wechatjs-init>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the wechatjsInit directive'
