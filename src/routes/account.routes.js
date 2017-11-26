import { Router } from 'express';

import { authJwt } from '../services/auth.js';
import * as AccountController from '../controllers/account.controller';

const routes = new Router();

routes.get('/', authJwt, AccountController.getAccounts);

export default routes;
