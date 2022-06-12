import {Types} from 'mongoose';
import {z, RefinementCtx} from 'zod';

import {
  findReservationById,
  findRoom, findRoomById,
  findRoomExceptSpecificCollections,
  findUser, findUserById,
} from '../entities';

export const userUsernameExists = async (
    username: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const user = await findUser({username});

  if (!!user) {
    return ctx.addIssue({
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
    return ctx.addIssue({
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
    return ctx.addIssue({
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
    return ctx.addIssue({
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
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Name already exists',
    });
  }
};

export const roomExistsById = async (
    id: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid ObjectId',
    });
  }

  const room = await findRoomById(id);

  if (!room) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Room does not exist',
    });
  }
};

export const userExistsById = async (
    id: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid ObjectId',
    });
  }

  const user = await findUserById(id);

  if (!user) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'User does not exist',
    });
  }
};

export const reservationExistsById = async (
    id: string,
    ctx: RefinementCtx,
): Promise<void> => {
  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid ObjectId',
    });
  }

  const reservation = await findReservationById(id);

  if (!reservation) {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Reservation does not exist',
    });
  }
};
