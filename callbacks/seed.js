'use strict';

var mongoose = require('mongoose'),
  User = require('./api/users/user.model'),
  users = require('../data/users.json');

module.exports = function() {
  User.find({}).remove().exec(function(err) {
    if (err) {
      return console.error('Error on inserting seed data:', err);
    }
    User.create(users, function(err) {
      if (err) {
        return console.error('Error on inserting seed data:', err);
      }
      console.log('Seed data has been successfully inserted!');
    });
  });
};
