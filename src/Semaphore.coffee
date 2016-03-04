
{ assertType, Void } = require "type-utils"
{ async } = require "io"

Factory = require "factory"

module.exports = Factory "Semaphore",

  kind: Function

  initArguments: (count, forEach) ->
    assertType count, Number
    assertType forEach, [ Function.Kind, Void ]
    arguments

  func: ->
    @_calls += 1
    @_forEach?.apply this, arguments
    @_deferred.fulfill() if @_calls is @_count
    return

  initFrozenValues: (count, forEach) ->
    _deferred: async.defer()
    _count: count
    _forEach: forEach

  initValues: ->
    _calls: 0

  then: (listener) ->
    return async.fulfill() unless listener?
    @_deferred.promise.then listener
