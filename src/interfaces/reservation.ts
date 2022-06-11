import {Types} from 'mongoose';

export type TReservationStatus = 'pending' | 'paid' | 'deleted';

export type TPaymentMethod = 'cash' | 'card';

export interface IReservation {
  id: string;
  userId: Types.ObjectId | string;
  roomId: Types.ObjectId | string;
  amount: number;
  stayDays: number;
  transactionCode?: string;
  paymentMethod?: TPaymentMethod;
  status: TReservationStatus;
  createdAt: string;
  updatedAt: string;
}
