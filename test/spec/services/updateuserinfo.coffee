'use strict'

describe 'Service: updateuserinfo', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  updateuserinfo = {}
  beforeEach inject (_updateuserinfo_) ->
    updateuserinfo = _updateuserinfo_

  it 'should do something', ->
    expect(!!updateuserinfo).toBe true
