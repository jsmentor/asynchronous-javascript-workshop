'use strict';
var compress = require('koa-compress'),
  logger = require('koa-logger'),
  koa = require('koa'),
  path = require('path'),
  route = require('koa-route'),
  mongoose = require('mongoose'),
  seed = require('./seed'),
  port = process.env.PORT || 8080,
  app = module.exports = koa();
// Logger
app.use(logger());

require('./routes')(app);

// Compress
app.use(compress());

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

mongoose.connection.open('mongodb://localhost/jsremoteconf-2016');

seed();

if (!module.parent) {
  app.listen(port);
  console.log(`The server is running at http://localhost:${port}/`);
}
