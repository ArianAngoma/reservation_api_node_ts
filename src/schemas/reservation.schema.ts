import {z} from 'zod';

import {
  reservationExistsById,
  roomExistsById,
  userExistsById,
} from '../middlewares';

export const createReservationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
      invalid_type_error: 'UserId must be a string',
    }).superRefine(userExistsById),

    roomId: z.string({
      required_error: 'RoomId is required',
      invalid_type_error: 'RoomId must be a string',
    }).superRefine(roomExistsById),

    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }).min(1, {message: 'Amount must be at least 1'}),

    stayDays: z.number({
      required_error: 'StayDays is required',
      invalid_type_error: 'StayDays must be a number',
    }).int({message: 'StayDays must be an integer'})
        .min(1, {message: 'StayDays must be at least 1'}),

    transactionCode: z.string({
      required_error: 'TransactionCode is required',
      invalid_type_error: 'TransactionCode must be a string',
    }).optional(),

    paymentMethod: z.enum(['cash', 'card'], {
      invalid_type_error: 'PaymentMethod must be cash or card',
    }),

    status: z.enum(['pending', 'paid', 'deleted'], {
      invalid_type_error: 'Status must be pending, paid or deleted',
    }).default('pending'),
  }),
});

export const updateReservationSchema = z.object({
  body: z.object({
    roomId: z.string({
      required_error: 'RoomId is required',
      invalid_type_error: 'RoomId must be a string',
    }).superRefine(roomExistsById)
        .optional(),

    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }).min(1, {message: 'Amount must be at least 1'})
        .optional(),

    stayDays: z.number({
      required_error: 'StayDays is required',
      invalid_type_error: 'StayDays must be a number',
    }).int({message: 'StayDays must be an integer'})
        .min(1, {message: 'StayDays must be at least 1'})
        .optional(),

    transactionCode: z.string({
      required_error: 'TransactionCode is required',
      invalid_type_error: 'TransactionCode must be a string',
    }).optional(),

    paymentMethod: z.enum(['cash', 'card'], {
      invalid_type_error: 'PaymentMethod must be cash or card',
    }).optional(),

    status: z.enum(['pending', 'paid', 'deleted'], {
      invalid_type_error: 'Status must be pending, paid or deleted',
    }).optional(),
  }),
  params: z.object({
    id: z.string({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a string',
    }).superRefine(reservationExistsById),
  }),
});
