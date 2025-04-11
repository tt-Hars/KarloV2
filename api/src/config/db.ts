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
    await mongoose.connect(uri, {
      isAstra: true,
    });
    console.log(`DB connected`);
  }
  catch (error) {
    console.error(error.message);
    process.exit(1)
  }
};

export default connectToAstraDb
