'use strict';

var objToString = Object.prototype.toString;

function promisify(obj) {
  var argsLen = arguments.length;
  if (!argsLen) {
    return Promise.resolve();
  }
  if (typeof obj === 'function') {
    return new Promise(obj);
  }
  return new Promise(function(resolve, reject) {
    if (typeof obj === 'object' && obj && typeof obj.then === 'function') {
      obj.then(resolve, reject);
    } else {
      if (typeof obj === 'object' && obj && typeof obj.message == 'string' && objToString.call(value) == '[object Error]') {
        reject(obj);
      } else {
        resolve(obj);
      }
    }
  });
}

promisify.delay = function(millisecond, obj) {
  millisecond = (typeof millisecond === 'number') ? millisecond : 4;
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(obj);
    }, millisecond);
  });
};

module.exports = promisify;
