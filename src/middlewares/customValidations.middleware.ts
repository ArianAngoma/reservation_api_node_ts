import {z, RefinementCtx} from 'zod';

import {findUser} from '../entities';

export const usernameExists = async (
    username: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const user = await findUser({username});

  if (!!user) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Username already exists',
    });
  }
};

export const identificationExists = async (
    identification: number,
    ctx: RefinementCtx,
): Promise<void> => {
  const user = await findUser({identification});

  if (!!user) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Identification already exists',
    });
  }
};

export const emailExists = async (
    email: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const user = await findUser({email});

  if (!!user) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Email already exists',
    });
  }
};
