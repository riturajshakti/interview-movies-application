import { Router } from 'express';
import validations from './validations';
import controllers from './controllers';
const router = Router();

router.post('/login', validations.login, controllers.login);

module.exports = router;
