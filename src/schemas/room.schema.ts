import {z} from 'zod';
import {
  roomExistsById,
  roomNameExists,
  roomNameExistsExceptSelf,
} from '../middlewares';

export const createRoomSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }).min(1, {message: 'Name must be at least 1 character'})
        .max(5, {message: 'Name must be at most 5 characters'})
        .superRefine(roomNameExists),

    floor: z.number({
      required_error: 'Floor is required',
      invalid_type_error: 'Floor must be a number',
    }).int({message: 'Floor must be an integer'})
        .min(1, {message: 'Floor must be at least 1'})
        .max(35, {message: 'Floor must be at most 35'}),

    hasBathroom: z.boolean({
      required_error: 'HasBathroom is required',
      invalid_type_error: 'HasBathroom must be a boolean',
    }).default(false),

    type: z.enum(['personal', 'group', 'matrimonial'], {
      invalid_type_error: 'Type must be personal, group or matrimonial',
    }).default('personal'),

    isReserved: z.boolean({
      required_error: 'IsReserved is required',
      invalid_type_error: 'IsReserved must be a boolean',
    }).default(false),
  }),
});

export const editRoomSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }).min(1, {message: 'Name must be at least 1 character'})
        .max(5, {message: 'Name must be at most 5 characters'})
        .superRefine(roomNameExistsExceptSelf)
        .optional(),

    floor: z.number({
      required_error: 'Floor is required',
      invalid_type_error: 'Floor must be a number',
    }).int({message: 'Floor must be an integer'})
        .min(1, {message: 'Floor must be at least 1'})
        .max(35, {message: 'Floor must be at most 35'})
        .optional(),

    hasBathroom: z.boolean({
      required_error: 'HasBathroom is required',
      invalid_type_error: 'HasBathroom must be a boolean',
    }).optional(),

    type: z.enum(['personal', 'group', 'matrimonial'], {
      invalid_type_error: 'Type must be personal, group or matrimonial',
    }).optional(),

    isReserved: z.boolean({
      required_error: 'IsReserved is required',
      invalid_type_error: 'IsReserved must be a boolean',
    }).optional(),
  }),
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a string',
    }).superRefine(roomExistsById),
  }),
});

export const deleteRoomSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a string',
    }).superRefine(roomExistsById),
  }),
});
