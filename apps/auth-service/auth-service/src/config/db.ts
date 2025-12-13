import mongoose from 'mongoose';
import { driver, createAstraUri } from 'stargate-mongoose';

const connectToAstraDb = async () => {
  const uri = createAstraUri(
    process.env.ASTRA_DB_API_ENDPOINT || '',
    process.env.ASTRA_DB_APPLICATION_TOKEN || '',
  );

  mongoose.set('autoCreate', true);
  mongoose.setDriver(driver);
  try {
    // If already connected, return immediately
    if ((mongoose.connection.readyState as unknown as number) === 1) {
      return;
    }

    // If connecting or disconnecting, reset the state
    if ((mongoose.connection.readyState as unknown as number) !== 0) {
      console.log(`DB status is ${mongoose.connection.readyState}, getting disconnected to retry`);
      await mongoose.disconnect();
    }

    await mongoose.connect(uri, {
      isAstra: true,
      serverSelectionTimeoutMS: 5000, // Fail fast after 5 seconds
    } as any);
    console.log(`DB connected`);
  }
  catch (error) {
    console.error("Database connection failed:", error.message);
    // Do not exit, allow the server to keep running so it can report the error or recover
  }
};

export default connectToAstraDb
