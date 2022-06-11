import {Request, Response} from 'express';

import {createNewRoom} from '../entities';

export const createRoom = async (
    req: Request,
    res: Response,
) => {
  const data = req.body;

  const room = await createNewRoom({...data});

  return res.status(200).json({
    ok: true,
    room,
  });
};
