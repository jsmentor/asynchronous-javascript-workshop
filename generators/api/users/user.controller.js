/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

var notFound = require('../../components/errors').notFound,
  awaitify = require('awaitify'),
  mongoose = require('mongoose'),
  User = require('./user.model');

exports.index = awaitify(function*(req, res, next) {
  try {
    var users = yield User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

exports.show = awaitify(function*(req, res, next) {
  try {
    var user = yield User.findById(req.params.id);
    if (!user) {
      return notFound(req, res);
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
