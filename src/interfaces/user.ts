export enum EUserRole {
  admin = 'admin',
  client = 'client',
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: EUserRole;
  password: string;
  createdAt: string;
  updatedAt: string;
}
