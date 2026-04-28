import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function listUsers() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/local-lens";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  const users = await mongoose.connection.db.collection('users').find({}).toArray();
  console.log("Full Users List:");
  users.forEach((u, i) => {
    console.log(`${i}: _id: ${u._id}, clerkId: ${u.clerkId}`);
  });

  process.exit(0);
}

listUsers();
