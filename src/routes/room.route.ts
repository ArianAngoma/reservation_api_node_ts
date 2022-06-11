import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {createRoomSchema, editRoomSchema} from '../schemas';
import {validateJwt, validateAdmin} from '../helpers';
import {createRoom} from '../controllers';

export const roomRouter = Router();

roomRouter.post(
    '/create',
    [
      validateJwt,
      validateAdmin,
      schemaValidation(createRoomSchema),
    ],
    createRoom,
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
