'use strict';
require('./will');
var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  seed = require('./seed'),
  port = process.env.PORT || 8080,
  server = express();

// server.use(express.static(path.join(__dirname, 'public')));
server.set('appPath', path.join(__dirname, 'public'));

routes(server);

server.get('/api/*', function(req, res) {
  res.status(404).end();
});

// error handler
server.use(function(err, req, res, next) {
  if (err.status && Array.isArray(err.errors)) {
    return res.status(err.status).json(err.errors.map(function(e) {
      return e.message;
    }));
  } else if (err instanceof Error) {
    return res.status(500).send(err);
  }
  next(err);
});

mongoose.connection.open('mongodb://localhost/jsremoteconf-2016');

seed();

server.listen(port, function() {
  console.log(`The server is running at http://localhost:${port}/`);
});
