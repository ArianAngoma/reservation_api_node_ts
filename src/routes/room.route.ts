import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {createRoomSchema, deleteRoomSchema, editRoomSchema} from '../schemas';
import {validateJwt, validateAdmin} from '../helpers';
import {createRoom, deleteRoom, updateRoom} from '../controllers';

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

roomRouter.delete(
    '/delete/:id',
    [
      validateJwt,
      validateAdmin,
      schemaValidation(deleteRoomSchema),
    ],
    deleteRoom,
);
