'use strict';

var route = require('koa-route'),
  serve = require('koa-static'),
  usersController = require('./api/users/user.controller');

module.exports = (app) => {
  app.use(route.get('/api/users', usersController.index));
  app.use(route.get('/api/users/:id', usersController.show));

  app.use(serve('public'));
};
