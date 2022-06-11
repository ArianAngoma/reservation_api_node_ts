import {IRoom} from '../interfaces';
import {Room} from '../models';

export const findRoom = async (
    data: Partial<IRoom>,
): Promise<IRoom | null> => {
  try {
    return await Room.findOne({...data});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const findRoomExceptSpecificCollections = async (
    data: Partial<IRoom>,
    excludeField: Partial<keyof IRoom>,
    specificCollection: any[],
): Promise<IRoom | null> => {
  try {
    return await Room.findOne({
      ...data,
      excludeField: {$nin: specificCollection},
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const createNewRoom = async (
    data: Partial<IRoom>,
): Promise<IRoom> => {
  try {
    const room = new Room({...data});
    return await room.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
