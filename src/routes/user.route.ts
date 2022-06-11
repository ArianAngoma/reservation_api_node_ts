import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {registerSchema, loginSchema} from '../schemas';
import {register} from '../controllers';

const router = Router();

router.post(
    '/register',
    [schemaValidation(registerSchema)],
    register,
);

router.post(
    '/login',
    [schemaValidation(loginSchema)],
    () => console.log('Logging in user'),
);


export default router;
