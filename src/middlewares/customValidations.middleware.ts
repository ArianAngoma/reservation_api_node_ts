import {z, RefinementCtx} from 'zod';

import {
  findRoom,
  findRoomExceptSpecificCollections,
  findUser,
} from '../entities';

export const userUsernameExists = async (
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

export const userIdentificationExists = async (
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

export const userEmailExists = async (
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

export const roomNameExists = async (
    name: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const room = await findRoom({name});

  if (!!room) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Name already exists',
    });
  }
};

export const roomNameExistsExceptSelf = async (
    name: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const room = await findRoomExceptSpecificCollections(
      {name},
      'name',
      [name],
  );

  if (!!room) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Name already exists',
    });
  }
};
