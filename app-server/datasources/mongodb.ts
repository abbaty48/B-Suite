import config from 'config';
import mongoose, { connect } from 'mongoose';
// ENABLE strictQuery in mongoose 7
mongoose.set('strictQuery', true);

/**
 * MongodbService uses the mongoose to connect to MongoDB and  returns a Mongo instance.
 */

interface IConnectionResult {
  error: {
    message: string;
    name: string;
  } | null;
  connected: boolean;
}
export const mongodbService = () => {
  connect(
    config.get('databases.mongodb.schemaUri'),
    config.get('databases.mongodb.options'),
    (error) => {
      if (error) {
        console.log(`ERROR MONGO SERVER CONNECTION, REASON: ${error.message}`);
        return;
      }
      console.info(
        `${mongoose.connection.db.databaseName} DATABASE CONNECTED. `
      );
    }
  );
}; // end mongodbService()
