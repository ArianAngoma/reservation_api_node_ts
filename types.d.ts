import IUsers from './src/interfaces';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    export interface Request {
      user: IUsers;
    }
  }
}
