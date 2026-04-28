import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function migrateUsers() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/local-lens";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  const users = await mongoose.connection.db.collection('users').find({}).toArray();
  console.log(`Found ${users.length} users to check.`);

  for (const user of users) {
    const update = {};
    if (user.Username && !user.name) update.name = user.Username;
    if (user.Email && !user.email) update.email = user.Email;
    if (user.image !== undefined && !user.imageUrl) update.imageUrl = user.image;

    if (Object.keys(update).length > 0) {
      console.log(`Migrating user ${user.clerkId || user._id}...`);
      await mongoose.connection.db.collection('users').updateOne(
        { _id: user._id },
        { 
          $set: update,
          $unset: { Username: "", Email: "", image: "" }
        }
      );
    }
  }

  console.log("Migration complete.");
  process.exit(0);
}

migrateUsers();
