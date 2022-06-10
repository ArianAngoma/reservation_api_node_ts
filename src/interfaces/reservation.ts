import {Types} from 'mongoose';

export enum EReservationStatus {
  pending = 'pending',
  paid = 'paid',
  deleted = 'deleted',
}

export interface IReservation {
  id: string;
  userId: Types.ObjectId | string;
  roomId: Types.ObjectId | string;
  amount: number;
  status: EReservationStatus;
  createdAt: string;
  updatedAt: string;
}
