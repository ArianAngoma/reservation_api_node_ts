import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';

import {createUser} from '../entities';
import {generateToken} from '../helpers';

export const register = async (req: Request, res: Response) => {
  const {name, username, email, identification, role, password} = req.body;

  const salt = bcryptjs.genSaltSync();
  const passwordHash = bcryptjs.hashSync(password, salt);

  const user = await createUser({
    name,
    username,
    email,
    identification,
    role,
    password: passwordHash,
  });

  const token = generateToken({id: user.id});

  return res.status(200).json({
    ok: true,
    user,
    token,
  });
};
