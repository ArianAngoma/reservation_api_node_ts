import {Types} from 'mongoose';

export enum EReservationStatus {
  pending = 'pending',
  paid = 'paid',
  deleted = 'deleted',
}

export enum EPaymentMethod {
  cash = 'cash',
  card = 'card',
}

export interface IReservation {
  id: string;
  userId: Types.ObjectId | string;
  roomId: Types.ObjectId | string;
  amount: number;
  stayDays: number;
  transactionCode?: string;
  paymentMethod?: EPaymentMethod;
  status: EReservationStatus;
  createdAt: string;
  updatedAt: string;
}
