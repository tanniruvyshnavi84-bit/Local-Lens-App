import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  imageUrl: String,
  role: { type: String, enum: ['tourist', 'guide', 'admin'], default: 'tourist' }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;