'use strict';

var mongoose = require('mongoose'),
  User = require('./api/users/user.model'),
  promisify = require('./promisify'),
  users = require('../data/users.json');

module.exports = function() {
  promisify(User.find({}).remove())
    .then(function() {
      return User.create(users);
    })
    .then(function() {
      console.log('Seed data has been successfully inserted!');
    })
    .catch(function(err) {
      console.error('Error on inserting seed data:', err);
    });
};
