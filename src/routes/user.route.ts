import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {registerSchema, loginSchema} from '../schemas';
import {login, register} from '../controllers';

export const userRouter = Router();

userRouter.post(
    '/register',
    [schemaValidation(registerSchema)],
    register,
);

userRouter.post(
    '/login',
    [schemaValidation(loginSchema)],
    login,
);
