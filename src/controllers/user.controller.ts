import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';

import {createUser, findUser} from '../entities';
import {generateToken} from '../helpers';

export const register = async (
    req: Request,
    res: Response,
): Promise<Response> => {
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

export const login = async (
    req: Request,
    res: Response,
): Promise<Response> => {
  const {username, password} = req.body;

  const user = await findUser({username});
  if (!user) {
    return res.status(404).json({
      ok: false,
      message: 'User not found',
    });
  }

  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid password',
    });
  }

  const token = generateToken({id: user.id});

  return res.status(200).json({
    ok: true,
    user,
    token,
  });
};
