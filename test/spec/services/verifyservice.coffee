'use strict'

describe 'Service: verifyService', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  verifyService = {}
  beforeEach inject (_verifyService_) ->
    verifyService = _verifyService_

  it 'should do something', ->
    expect(!!verifyService).toBe true
