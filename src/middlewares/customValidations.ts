import {findUser} from '../entities/user';

export const emailExists = async (
    email: string,
): Promise<boolean> => {
  const user = await findUser({email});
  return !!user;
};

export const identificationExists = async (
    identification: number,
): Promise<boolean> => {
  const user = await findUser({identification});
  return !!user;
};
