import {model, Schema} from 'mongoose';

import {IReservation, EReservationStatus} from '../interfaces';

const reservationStatus: EReservationStatus[] = Object.values(EReservationStatus);

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
  status: {
    type: String,
    required: true,
    enum: reservationStatus,
    default: EReservationStatus.pending,
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

export const Reservation = model<IReservation>('Reservation', ReservationSchema);
