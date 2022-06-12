import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import {findUserById} from '../entities';

export const generateToken = ({id}: { id: string }): string => {
  const payload = {id};
  return jwt.sign(payload, process.env.SECRET_KEY_JWT!, {
    expiresIn: '4h',
  });
};

export const validateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token, authorization denied',
    });
  }

  try {
    const {id} = jwt.verify(
        token,
      process.env.SECRET_KEY_JWT!,
    ) as { id: string };

    const user = await findUserById(id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'Invalid token, authorization denied',
      });
    }

    // @ts-ignore
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
};
