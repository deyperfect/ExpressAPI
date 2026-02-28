const mongoose = require('mongoose');

// Separated DB connection logic — keeps server.js clean
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
