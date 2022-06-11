import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {createRoomSchema, editRoomSchema} from '../schemas';
import {validateJwt, validateAdmin} from '../helpers';
import {createRoom, updateRoom} from '../controllers';

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
    '/update/:id',
    [
      validateJwt,
      validateAdmin,
      schemaValidation(editRoomSchema),
    ],
    updateRoom,
);
