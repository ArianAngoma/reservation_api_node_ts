import {Request, Response} from 'express';

import {createNewRoom, deleteRoomById, updateRoomById} from '../entities';

export const createRoom = async (
    req: Request,
    res: Response,
): Promise<Response> => {
  const data = req.body;

  const room = await createNewRoom({...data});

  return res.status(200).json({
    ok: true,
    room,
  });
};


export const updateRoom = async (
    req: Request,
    res: Response,
): Promise<Response> => {
  const data = req.body;
  const {id} = req.params;

  const room = await updateRoomById(id, {...data});

  return res.status(200).json({
    ok: true,
    room,
  });
};

export const deleteRoom = async (
    req: Request,
    res: Response,
): Promise<Response> => {
  const {id} = req.params;

  const room = await deleteRoomById(id);

  return res.status(200).json({
    ok: true,
    room,
  });
};
