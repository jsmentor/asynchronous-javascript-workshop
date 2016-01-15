/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

var mongoose = require('mongoose'),
  User = require('./user.model');

exports.index = function*() {
  this.body = yield User.find({});
};

exports.show = function*(id) {
  var user = yield User.findById(id);
  if (!user) {
    return this.throw('User not found!', 404);
  }
  this.body = user;
};
