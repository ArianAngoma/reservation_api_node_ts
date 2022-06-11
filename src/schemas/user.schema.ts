import {z} from 'zod';

import {
  usernameExists,
  emailExists,
  identificationExists,
} from '../middlewares';

export const registerSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }).min(3, {message: 'Name must be at least 3 characters'})
        .max(50, {message: 'Name must be at most 50 characters'}),

    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }).min(3, {message: 'Username must be at least 3 characters'})
        .max(50, {message: 'Username must be at most 50 characters'})
        .superRefine(usernameExists),

    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }).min(3, {message: 'Email must be at least 3 characters'})
        .max(50, {message: 'Email must be at most 50 characters'})
        .email({message: 'Email must be a valid email'})
        .superRefine(emailExists),

    identification: z.number({
      required_error: 'Identification is required',
      invalid_type_error: 'Identification must be a number',
    }).int({message: 'Identification must be an integer'})
        .superRefine(identificationExists),

    role: z.enum(['admin', 'client'], {
      invalid_type_error: 'Role must be admin or client',
    }).optional(),

    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }).min(3, {message: 'Password must be at least 3 characters'})
        .max(50, {message: 'Password must be at most 50 characters'}),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }).min(3, {message: 'Username must be at least 3 characters'})
        .max(50, {message: 'Username must be at most 50 characters'}),

    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }).min(3, {message: 'Password must be at least 3 characters'})
        .max(50, {message: 'Password must be at most 50 characters'}),
  }),
});
