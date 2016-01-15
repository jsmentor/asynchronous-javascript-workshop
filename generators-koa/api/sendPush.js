'use strict';

require('ches-db');
var mongoose = require('mongoose'),
  _ = require('lodash'),
  parse = require('co-body'),
  moment = require('moment'),
  PushAd = mongoose.model('push_ad'),
  schedule = require('../schedule');

function vallidateTiming(pushRequest) {
  var now = moment().utc().unix();
  if (!_.isNumber(pushRequest.start)) {
    pushRequest.start = now;
  }
  if (_.isNumber(pushRequest.end)) {
    return (now <= pushRequest.end);
  }
  return true;
}

function getPushAdDate(pushRequest) {
  var now = moment().utc();
  if (now.unix() > pushRequest.start) {
    return 5;
  } else {
    return pushRequest.start - now.unix();
  }
}

module.exports = function * sendPush() {
  var pushAd,
    savedPushAd,
    pushRequest = yield parse(this);

  if (!vallidateTiming(pushRequest)) {
    this.throw(500, 'Invalid Timing');
    return;
  }

  pushAd = new PushAd({
    request: pushRequest,
    status: 'waiting',
    sentCount: 0
  });
  savedPushAd = yield pushAd.save();

  schedule(getPushAdDate(pushRequest), savedPushAd._id);

  this.body = {
    requestId: savedPushAd._id
  };
};