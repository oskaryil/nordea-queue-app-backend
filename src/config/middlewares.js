/**
 * Configuration of the server middlewares.
 */

import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import MongoStore from 'connect-mongo';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import expressStatusMonitor from 'express-status-monitor';

import winstonInstance from './winston';
import constants from './constants';
import mongooseConnection from './database';

const mongoStore = MongoStore(session);

const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

export default app => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: constants.SESSION_SECRET,
      saveUninitialized: true,
      resave: true,
      cookie: { secure: false },
      maxAge: new Date(Date.now() + 9000000),
      store: new mongoStore({ mongooseConnection }),
    }),
  );
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  app.use(expressStatusMonitor());
  app.use(methodOverride());
  if (isDev && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg:
          'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true,
      }),
    );
  }
};
