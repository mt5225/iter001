'use strict'

describe 'Service: houseservice', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  houseservice = {}
  beforeEach inject (_houseservice_) ->
    houseservice = _houseservice_

  it 'should do something', ->
    expect(!!houseservice).toBe true
