import { Router } from 'express';
import validations from './validations';
import controllers from './controllers';
import auth from '../auth/auth';
const router = Router();

router.get('/', auth.authorizeUser, validations.getMovies, controllers.getMovies);

router.get('/:movieId', auth.authorizeUser, validations.getMovie, controllers.getMovie);

router.post('/', auth.authorizeUser, validations.postMovie, controllers.postMovie);

router.patch('/:movieId', auth.authorizeUser, validations.patchMovie, controllers.patchMovie);

module.exports = router;
