// import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import seed from './seed';

const port = process.env.PORT || 8080;
const server = express();

// server.use(express.static(path.join(__dirname, 'public')));
server.set('appPath', path.join(__dirname, 'public'));

routes(server);

server.get('/api/*', function(req, res) {
  res.status(404).end();
});

// error handler
server.use((err, req, res, next) => {
  if (err.status && Array.isArray(err.errors)) {
    return res.status(err.status).json(err.errors.map((e) => e.message));
  } else if(err instanceof Error){
    return res.status(500).send(err);
  }
  next(err);
});

mongoose.connection.open('mongodb://localhost/jsremoteconf-2016');

seed();

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
