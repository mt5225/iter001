'use strict'

describe 'Service: surveycheck', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  surveycheck = {}
  beforeEach inject (_surveycheck_) ->
    surveycheck = _surveycheck_

  it 'should do something', ->
    expect(!!surveycheck).toBe true
