'use strict'

describe 'Service: dayarray', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  dayarray = {}
  beforeEach inject (_dayarray_) ->
    dayarray = _dayarray_

  it 'should do something', ->
    expect(!!dayarray).toBe true
