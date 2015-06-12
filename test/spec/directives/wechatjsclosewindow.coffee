'use strict'

describe 'Directive: wechatjsCloseWindow', ->

  # load the directive's module
  beforeEach module 'iter001App'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<wechatjs-close-window></wechatjs-close-window>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the wechatjsCloseWindow directive'
