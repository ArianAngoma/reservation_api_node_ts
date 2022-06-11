export type TUserRole = 'admin' | 'client';

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  identification: number;
  role: TUserRole;
  password: string;
  createdAt: string;
  updatedAt: string;
}
