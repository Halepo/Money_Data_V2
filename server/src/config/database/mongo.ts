require("dotenv").config();
import { MongoClient } from 'mongodb';
import { logger } from 'src/classes/consoleLoggerClass';

const mongoConnStr: any = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(mongoConnStr, { useUnifiedTopology: true });

let db;
const createConn = async () => {
  await client.connect()
    .then(() => console.log('Connected to db successfully!'))
    .catch((error) => {
      logger.infoData("database connection failed. exiting now...");
      logger.errorData(error);
      process.exit(1);
    });
  db = client.db('Primary');
};

export { createConn, db };
