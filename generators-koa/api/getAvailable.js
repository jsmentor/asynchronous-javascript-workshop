'use strict';
var parse = require('co-body'),
    pushAdsRepository = require('ches-repository').pushAds,
    _ = require('lodash');

module.exports = function* getAvailable() {
    var data = yield parse(this),
        count = yield pushAdsRepository.getAvailableCount(_.get(data, 'target'),
            _.get(data, 'adsUserId'));

    this.body = {
        available: count
    };
};