import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {
  createReservationSchema,
  updateReservationSchema,
} from '../schemas';
import {validateReservationAuthorization, validateJwt} from '../helpers';
import {createReservation, updateReservation} from '../controllers';

export const reservationRouter = Router();

reservationRouter.post(
    '/create',
    [
      validateJwt,
      schemaValidation(createReservationSchema),
    ],
    createReservation,
);

reservationRouter.put(
    '/update/:id',
    [
      validateJwt,
      schemaValidation(updateReservationSchema),
      validateReservationAuthorization,
    ],
    updateReservation,
);
