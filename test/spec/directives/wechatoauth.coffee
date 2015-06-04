'use strict'

describe 'Directive: wechatOAuth', ->

  # load the directive's module
  beforeEach module 'iter001App'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<wechat-o-auth></wechat-o-auth>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the wechatOAuth directive'
