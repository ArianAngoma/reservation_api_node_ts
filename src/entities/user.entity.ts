import {IUser} from '../interfaces';
import {User} from '../models';

export const findUser = async (
    data: Partial<Omit<IUser, 'id'>>,
): Promise<IUser | null> => {
  try {
    return await User.findOne({...data});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const createUser = async (
    data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<IUser> => {
  try {
    const user = new User({...data});
    return await user.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const findUserById = async (
    id: string,
): Promise<IUser | null> => {
  try {
    return await User.findById(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
