import { MongoClient } from 'mongodb';
require("dotenv").config();

const mongoConnStr: any = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(mongoConnStr, { useUnifiedTopology: true });

let db;
const createConn = async () => {
  await client.connect()
    .then(() => console.log('connected to db successfully'))
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
  db = client.db('Primary');
};

export { createConn, db };
