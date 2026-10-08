import mongoose from 'mongoose';

// Connects to MongoDB Atlas using the MONGO_URI from backend/.env.
// If the connection fails, the process exits (the API is useless without its database).
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  // Catch the most common setup mistakes with a clear message
  if (!uri || uri.startsWith('your_') || uri.includes('<password>') || uri.includes('<db_password>')) {
    console.error('MONGO_URI is missing or still contains a placeholder. Edit backend/.env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // fail after 10s instead of hanging
    });
    console.log('MongoDB connected successfully');
    console.log(`  Host:     ${conn.connection.host}`);
    console.log(`  Database: ${conn.connection.name}`);
    if (conn.connection.name !== 'ghostbreach_soc') {
      console.warn('  WARNING: expected database "ghostbreach_soc". Add /ghostbreach_soc before the "?" in MONGO_URI (backend/.env).');
    }
  } catch (error) {
    // Only the error message is printed, never the connection string
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

export {};
