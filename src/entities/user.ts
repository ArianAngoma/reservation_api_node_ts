import {IUser} from '../interfaces';
import {User} from '../models';

export const findUser = async (
    data: Partial<IUser>,
): Promise<IUser | null> => {
  try {
    return await User.findOne({...data});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
