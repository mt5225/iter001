'use strict'

describe 'Service: wechatUserInfo', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  wechatUserInfo = {}
  beforeEach inject (_wechatUserInfo_) ->
    wechatUserInfo = _wechatUserInfo_

  it 'should do something', ->
    expect(!!wechatUserInfo).toBe true
