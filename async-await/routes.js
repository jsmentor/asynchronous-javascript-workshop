import { notFound } from './components/errors';
import path from 'path';
import usersRouter from './api/users';

export default function(server) {

  // Insert routes below
  server.use('/api/users', usersRouter);

  // All undefined asset or api routes should return a 404
  server.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(notFound);

  // All other routes should redirect to the index.html
  server.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(server.get('appPath') + '/index.html'));
    });
};
