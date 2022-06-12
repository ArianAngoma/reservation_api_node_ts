import {Router} from 'express';

import {schemaValidation} from '../middlewares';
import {
  createReservationSchema,
  updateReservationSchema,
} from '../schemas';
import {validateReservationAuthorization, validateJwt} from '../helpers';

export const reservationRouter = Router();

reservationRouter.post(
    '/create',
    [
      validateJwt,
      schemaValidation(createReservationSchema),
    ],
    (req: any) => console.log(req.body),
);

reservationRouter.put(
    '/update/:id',
    [
      validateJwt,
      schemaValidation(updateReservationSchema),
      validateReservationAuthorization,
    ],
    (req: any) => console.log(req.body),
);
