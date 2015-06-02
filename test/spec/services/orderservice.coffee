'use strict'

describe 'Service: orderService', ->

  # load the service's module
  beforeEach module 'iter001App'

  # instantiate service
  orderService = {}
  beforeEach inject (_orderService_) ->
    orderService = _orderService_

  it 'should do something', ->
    expect(!!orderService).toBe true
