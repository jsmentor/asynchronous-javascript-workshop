'use strict';

require('ches-db');
var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  PushAd = mongoose.model('push_ad');

module.exports = function * getStatus(requestId) {
  if (String(requestId).length !== 24) {
    this.throw(404, 'invalid requestId');
  }
  var pushAd = yield PushAd.findOne({
    _id: ObjectId(requestId)
  });
  if (!pushAd) {
    this.throw(404, 'could not find the requestId');
  }
  this.body = {
    sent: pushAd.sentCount,
    status: pushAd.status
  };
};
