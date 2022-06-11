import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {createRoomSchema, editRoomSchema} from '../schemas';
import {validateJwt, validateAdmin} from '../helpers';

export const roomRouter = Router();

roomRouter.post(
    '/create',
    [
      validateJwt,
      validateAdmin,
      schemaValidation(createRoomSchema),
    ],
    (req: any, res: any) => console.log(req.body),
);

roomRouter.put(
    '/edit/:id',
    [
      validateJwt,
      validateAdmin,
      schemaValidation(editRoomSchema),
    ],
    (req: any, res: any) => console.log(req.body),
);
