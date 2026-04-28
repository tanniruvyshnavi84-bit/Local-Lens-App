import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkIndexes() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/local-lens";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  const indexes = await mongoose.connection.db.collection('users').indexes();
  console.log("Users Indexes:", JSON.stringify(indexes, null, 2));

  const users = await mongoose.connection.db.collection('users').find({}).toArray();
  const clerkIds = users.map(u => u.clerkId);
  const duplicates = clerkIds.filter((item, index) => clerkIds.indexOf(item) !== index);
  console.log("Duplicate Clerk IDs:", duplicates);

  process.exit(0);
}

checkIndexes();
