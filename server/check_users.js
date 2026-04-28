import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkUsers() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/local-lens";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  const users = await User.find({});
  console.log("Total Users:", users.length);
  if (users.length > 0) {
    console.log("First User Sample:", JSON.stringify(users[0], null, 2));
  }

  process.exit(0);
}

checkUsers();
