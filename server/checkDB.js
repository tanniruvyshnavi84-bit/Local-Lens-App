import mongoose from 'mongoose';
import Guide from './models/Guide.js';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
        
        const users = await User.find({});
        console.log("Total Users:", users.length);
        users.forEach(u => console.log(`User: ${u.name}, ClerkID: ${u.clerkId}, Role: ${u.role}, ID: ${u._id}`));

        const guides = await Guide.find({});
        console.log("Total Guides:", guides.length);
        guides.forEach(g => console.log(`Guide: ${g.name}, UserId: ${g.userId}, ID: ${g._id}`));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkDB();
