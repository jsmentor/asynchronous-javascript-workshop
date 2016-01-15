/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

var notFound = require('../../components/errors').notFound,
  mongoose = require('mongoose'),
  promisify = require('../../promisify'),
  User = require('./user.model');

exports.index = function(req, res, next) {
  promisify(User.find())
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(next);
};

exports.show = function(req, res, next) {
  promisify(User.findById(req.params.id))
    .then(function(user) {
      if (!user) {
        return notFound(req, res);
      }
      res.status(200).json(user);
    })
    .catch(next);
};

exports.create = function(req, res, next) {
  promisify.delay(10, {})
    .then(function(createdUser) {
      res.status(200).json(createdUser);
    });
};

exports.update = function(req, res, next) {
  promisify.delay(10, {})
    .then(function(updatedUser) {
      res.status(200).json(updatedUser);
    });
};

exports.destroy = function(req, res, next) {
  promisify.delay(10, {})
    .then(function(data) {
      res.status(200).json(data);
    });
};
