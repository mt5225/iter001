'use strict'

describe 'Service: wechat', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  wechat = {}
  beforeEach inject (_wechat_) ->
    wechat = _wechat_

  it 'should do something', ->
    expect(!!wechat).toBe true
