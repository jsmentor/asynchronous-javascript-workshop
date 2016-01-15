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
  delay = require('../../delay'),
  User = require('./user.model');

exports.index = function(req, res, next) {
  User.find({}, function(err, users) {
    if(err){
      return next(err);
    }
    res.status(200).json(users);
  });
};

exports.show = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if(err){
      return next(err);
    }
    if (!user) {
      return notFound(req, res);
    }
    res.status(200).json(user);
  });
};

exports.create = function(req, res, next) {
  delay(10, {}, function(err, createdUser) {
    if(err){
      return next(err);
    }
    res.status(200).json(createdUser);
  });
};

exports.update = function(req, res, next) {
  delay(10, {}, function(err, updatedUser) {
    if(err){
      return next(err);
    }
    res.status(200).json(updatedUser);
  });
};

exports.destroy = function(req, res, next) {
  delay(10, {}, function(err, data) {
    if(err){
      return next(err);
    }
    res.status(200).json(data);
  });
};
