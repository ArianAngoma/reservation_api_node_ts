import express, {Application} from 'express';
import cors from 'cors';

import {dbConnection} from '../database/config.database';
import {userRouter, roomRouter, reservationRouter} from '../routes';

class Server {
  app: Application;
  readonly port: string;
  apiPaths = {
    user: '/api/v1/user',
    room: '/api/v1/room',
    reservation: '/api/v1/reservation',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '4000';
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB(): Promise<void> {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.user, userRouter);
    this.app.use(this.apiPaths.room, roomRouter);
    this.app.use(this.apiPaths.reservation, reservationRouter);
  }

  listen() {
    return this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
