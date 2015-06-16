'use strict'

describe 'Service: availableroom', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  availableroom = {}
  beforeEach inject (_availableroom_) ->
    availableroom = _availableroom_

  it 'should do something', ->
    expect(!!availableroom).toBe true
