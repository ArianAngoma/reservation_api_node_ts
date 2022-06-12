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

export const createNewReservation = async (
    data: Partial<IReservation>,
): Promise<IReservation> => {
  try {
    const reservation = new Reservation({...data});
    return await reservation.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const updateReservationById = async (
    id: string,
    data: Partial<IReservation>,
): Promise<IReservation | null> => {
  try {
    return await Reservation.findByIdAndUpdate(id, {...data}, {new: true});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
