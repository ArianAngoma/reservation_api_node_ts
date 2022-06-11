import {model, Schema} from 'mongoose';

import {IReservation, TReservationStatus, TPaymentMethod} from '../interfaces';

const reservationStatus: TReservationStatus[] = ['pending', 'paid', 'deleted'];
const paymentMethod: TPaymentMethod[] = ['cash', 'card'];

const ReservationSchema = new Schema<IReservation>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  roomId: {
    type: String,
    required: true,
    ref: 'Room',
  },
  amount: {
    type: Number,
    required: true,
  },
  stayDays: {
    type: Number,
    required: true,
    min: 1,
  },
  transactionCode: {
    type: String,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: paymentMethod,
  },
  status: {
    type: String,
    required: true,
    enum: reservationStatus,
    default: 'pending',
  },
}, {
  timestamps: true,
});

ReservationSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...reservation
  } = this.toObject();
  reservation.id = _id;
  return reservation;
};

export const Reservation = model<IReservation>(
    'Reservation',
    ReservationSchema,
);
