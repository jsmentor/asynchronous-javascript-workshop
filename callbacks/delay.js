'use strict';

function delay(millisecond, obj, cb) {
  millisecond = (typeof millisecond === 'number') ? millisecond : 4;
  setTimeout(function() {
    if (typeof cb === 'function') {
      cb(null, obj);
    }
  }, millisecond);
};

module.exports = delay;
