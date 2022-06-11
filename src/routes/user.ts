import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {registerSchema, loginSchema} from '../schema';

const router = Router();

router.post(
    '/register',
    schemaValidation(registerSchema),
    () => console.log('Registering user'),
);

router.post(
    '/login',
    schemaValidation(loginSchema),
    () => console.log('Logging in user'),
);


export default router;
