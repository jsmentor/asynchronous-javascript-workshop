'use strict';

var notFound = require('./components/errors').notFound,
  path = require('path'),
  usersRouter = require('./api/users');

module.exports = function(server) {

  // Insert routes below
  server.use('/api/users', usersRouter);

  // All undefined asset or api routes should return a 404
  server.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(notFound);

  // All other routes should redirect to the index.html
  server.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(server.get('appPath') + '/index.html'));
    });
};
