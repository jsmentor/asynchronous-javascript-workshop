'use strict';

var mongoose = require('mongoose'),
  awaitify = require('awaitify'),
  User = require('./api/users/user.model'),
  users = require('../data/users.json');

module.exports = awaitify(function*() {
  try {
    yield User.find({}).remove();
    yield User.create(users);
    console.log('Seed data has been successfully inserted!');
  } catch (err) {
    console.error('Error on inserting seed data:', err);
  }
});
