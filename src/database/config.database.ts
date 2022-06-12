import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

import dotenv from 'dotenv';

dotenv.config();

const {DB_MONGO, DB_MONGO_TEST, NODE_ENV} = process.env;

const connectionString = NODE_ENV === 'test' ? DB_MONGO_TEST : DB_MONGO;

export const dbConnection = async (): Promise<void> => {
  try {
    if (connectionString === 'inmemory') {
      const mongoServer: MongoMemoryServer = await MongoMemoryServer.create();
      const mongoUrl = mongoServer.getUri();
      await mongoose.connect(mongoUrl);
    } else {
      await mongoose.connect(connectionString!);
      console.log('DB online');
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Error connecting to DB`);
  }
};
