import {NextFunction, Request, Response} from 'express';

import {findReservationById} from '../entities';

export const validateAdmin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  // @ts-ignore
  const {role} = req.user;

  if (role !== 'admin') {
    return res.status(401).json({
      ok: false,
      msg: 'You must be an admin',
    });
  }

  next();
};

export const validateReservationAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  // @ts-ignore
  const {id, role} = req.user;

  const reservation = await findReservationById(req.params.id);

  if (role !== 'admin') {
    if (reservation!.userId !== id) {
      return res.status(401).json({
        ok: false,
        msg: 'You must be the owner of the reservation',
      });
    }
  }

  next();
};
