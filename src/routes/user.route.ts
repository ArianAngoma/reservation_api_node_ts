import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {registerSchema, loginSchema} from '../schemas';
import {login, register} from '../controllers';

const router = Router();

router.post(
    '/register',
    [schemaValidation(registerSchema)],
    register,
);

router.post(
    '/login',
    [schemaValidation(loginSchema)],
    login,
);


export default router;
