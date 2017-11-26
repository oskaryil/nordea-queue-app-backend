/**
 * API Routes
 */

import { Router } from 'express';
import HTTPStatus from 'http-status';

import UserRoutes from './user.routes';
import SeedRoutes from './seed.routes';
import AccountRoutes from './account.routes';
import NordeaRoutes from './nordea.routes';

import APIError from '../services/error';

// Middlewares
import logErrorService from '../services/log';

const routes = new Router();

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

routes.use('/users', UserRoutes);
routes.use('/account', AccountRoutes);
routes.use('/nordea', NordeaRoutes);

if (isDev || isTest) {
  routes.use('/seeds', SeedRoutes);
}

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);

export default routes;
