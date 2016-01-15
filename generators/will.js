(function() {
  var
    objToString = Object.prototype.toString,
    NativePromise = global.Promise,
    MAX_SAFE_INTEGER = Math.pow(2, 53) - 1,
    genCache = new Map();

  var GeneratorFunction;
  /* jshint ignore:start */
  GeneratorFunction = Object.getPrototypeOf(function*() {}).constructor;
  /* jshint ignore:end */

  function isPromiseAlike(obj) {
    return obj && typeof obj === 'object' && typeof obj.then === 'function';
  }

  function isGenerator(fn) {
    if (typeof fn === 'function') {
      return /^function\s*\*/.test(fn.toString());
    }
    return false;
  }

  function wrap(promise) {
    return {
      done: function(onFulfilled, onRejected) {
        var self = arguments.length ? promise.then.apply(promise, arguments) : promise;
        self.then(null, function(err) {
          setTimeout(function() {
            throw err;
          }, 0);
        });
      }
    };
  }

  //A function by Forbes Lindesay which helps us code in synchronous style
  //using yield keyword, whereas the actual scenario is an asynchronous process
  //https://www.promisejs.org/generators/
  function forbesAsync(makeGenerator) {
    return function() {
      var generator = makeGenerator.apply(this, arguments);

      function handle(result) {
        // result => { done: [Boolean], value: [Object] }
        if (result.done) return Promise.resolve(result.value);

        return Promise.resolve(result.value).then(function(res) {
          return handle(generator.next(res));
        }, function(err) {
          return handle(generator.throw(err));
        });
      }

      try {
        return handle(generator.next());
      } catch (ex) {
        return Promise.reject(ex);
      }
    };
  }

  function will(makeGenerator) {
    var asyncGenerator;
    if (genCache.has(makeGenerator)) {
      return genCache.get(makeGenerator);
    }
    asyncGenerator = forbesAsync(makeGenerator);
    genCache.set(makeGenerator, asyncGenerator);
    return asyncGenerator;
  }

  GeneratorFunction.prototype.will = function() {
    return will(this);
  };

  function makeAsync(fn) {
    return isGenerator(fn) ? fn.will() : fn;
  }

  function Promise(fn) {
    this.promise = isPromiseAlike(fn) ? fn : new NativePromise(makeAsync(fn));
  }
  Promise.prototype.then = function(onFulfilled, onRejected) {
    return new Promise(this.promise.then(makeAsync(onFulfilled), makeAsync(onRejected)));
  };
  Promise.prototype['catch'] = function(onRejected) {
    return new Promise(this.promise['catch'](makeAsync(onRejected)));
  };
  Promise.prototype.done = function(onFulfilled, onRejected) {
    wrap(this.promise).done(makeAsync(onFulfilled), makeAsync(onRejected));
  };
  Promise.all = function(obj) {
    return new Promise(NativePromise.all(obj));
  };
  Promise.race = function(obj) {
    return new Promise(NativePromise.race(obj));
  };
  Promise.resolve = function(obj) {
    return new Promise(NativePromise.resolve(obj));
  };
  Promise.reject = function(obj) {
    return new Promise(NativePromise.reject(obj));
  };

  will.Promise = Promise;

  module.exports = will;
}());
