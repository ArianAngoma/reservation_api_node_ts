import express, {Application} from 'express';
import cors from 'cors';

import {dbConnection} from '../database/config';

class Server {
  app: Application;
  readonly port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '4000';
    this.connectDB();
    this.middlewares();
  }

  async connectDB(): Promise<void> {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    return this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;