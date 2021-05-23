const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('http');
const debug = require('debug')('app:app');

const { PORT } = require('./appConfig');
const connectToDb = require('./helpers/connectToDb.helper');

module.exports.app = express();
module.exports.server = new Server(this.app);

module.exports.startServer = async () => {
  return new Promise(async (resolve) => {
    // connect to database
    await connectToDb();

    require('./models');

    // body-parser needed to parse form-data bodies
    this.app.use(bodyParser.json({ limit: '100mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000 }));
    // Handle `OPTIONS` request.
    this.app.all('*', (req, res, next) => {
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
      res.header(
        'Access-Control-Allow-Headers',
        [
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'Authorization',
          'Accept-Language',
        ].join(', '),
      );

      if (req.method == 'OPTIONS') {
        return res.status(200).end();
      } else {
        next();
      }
    });

    // enabling CORS for all routes.
    this.app.use(cors());

    // load routes
    const router = require('./routes');
    this.app.use('/api/v1', router);


    this.server.listen(PORT, () => {
      debug(`Listening on port ${PORT}`);

      // schedule cron jobs after server starts.
      setTimeout(() => {
        require('./jobs').schedule();
      }, 2000);

      return resolve();
    });
  });
};
