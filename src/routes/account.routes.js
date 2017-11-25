import { Router } from 'express';

import * as AccountController from '../controllers/account.controller';

const routes = new Router();

routes.get('/', AccountController.getAccounts);

export default routes;
