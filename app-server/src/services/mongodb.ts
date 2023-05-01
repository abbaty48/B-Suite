import config from 'config';
import mongoose, { connect } from 'mongoose';
// ENABLE strictQuery in mongoose 7
mongoose.set('strictQuery', true);

/**
 * MongodbService uses the mongoose to connect to MongoDB and  returns a Mongo instance.
 */
export const mongodbService = () =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<typeof mongoose>(async (resolve, reject) => {
    try {
      const mongoose = await connect(
        config.get('databases.mongodb.schemaUri'),
        config.get('databases.mongodb.options')
      );
      console.info(
        `${mongoose.connection.db.databaseName} DATABASE CONNECTED. `
      ); // end console.info
      resolve(mongoose);
    } catch (error) {
      console.log(`ERROR MONGO SERVER CONNECTION, REASON: ${error.message}`);
      reject(null);
    } // end catch
  }); // end mongodbService()
