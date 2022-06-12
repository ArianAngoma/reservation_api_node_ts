import {Request, Response} from 'express';
import {createNewReservation, updateReservationById} from '../entities';

export const createReservation = async (
    req: Request,
    res: Response,
): Promise<Response> => {
  const data = req.body;

  const reservation = await createNewReservation({...data});

  return res.status(200).json({
    ok: true,
    reservation,
  });
};

export const updateReservation = async (
    req: Request,
    res: Response,
): Promise<Response> => {
  const id = req.params.id;
  const data = req.body;

  const reservation = await updateReservationById(id, {...data});

  return res.status(200).json({
    ok: true,
    reservation,
  });
};
