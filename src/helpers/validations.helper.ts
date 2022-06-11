import {NextFunction, Request, Response} from 'express';

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
