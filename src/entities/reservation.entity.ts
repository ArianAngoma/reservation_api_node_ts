import {IReservation} from '../interfaces';
import {Reservation} from '../models';

export const findReservationById = async (
    id: string,
): Promise<IReservation | null> => {
  try {
    return await Reservation.findById(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
