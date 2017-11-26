/**
 * Nordea Routes
 */

import { Router } from 'express';
import validate from 'express-validation';

import * as NordeaController from '../controllers/nordea.controller';
import { authJwt } from '../services/auth';

const routes = new Router();

routes
  .route('/auth')
  .post(
    authJwt,
    validate(NordeaController.validation.nordeaAuth),
    NordeaController.nordeaAuth,
  );

export default routes;
