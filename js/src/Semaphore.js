var Factory, Void, assertType, async, ref;

ref = require("type-utils"), assertType = ref.assertType, Void = ref.Void;

async = require("io").async;

Factory = require("factory");

module.exports = Factory("Semaphore", {
  kind: Function,
  initArguments: function(count, forEach) {
    assertType(count, Number);
    assertType(forEach, [Function.Kind, Void]);
    return arguments;
  },
  func: function() {
    var ref1;
    this._calls += 1;
    if ((ref1 = this._forEach) != null) {
      ref1.apply(this, arguments);
    }
    if (this._calls === this._count) {
      this._deferred.fulfill();
    }
  },
  initFrozenValues: function(count, forEach) {
    return {
      _deferred: async.defer(),
      _count: count,
      _forEach: forEach
    };
  },
  initValues: function() {
    return {
      _calls: 0
    };
  },
  then: function(listener) {
    if (listener == null) {
      return async.fulfill();
    }
    return this._deferred.promise.then(listener);
  }
});

//# sourceMappingURL=../../map/src/Semaphore.map
