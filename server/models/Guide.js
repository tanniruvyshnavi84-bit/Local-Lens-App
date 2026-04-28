import mongoose from "mongoose";

const guideSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Clerk ID
  name: { type: String, required: true },
  email: String,
  phoneNumber: String,
  whatsappNumber: String,
  experienceYears: Number,
  specialties: [String],
  places: [String], // Array of place IDs or names
  maxGroupSize: Number,
  instagramHandle: String,
  rating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  bio: String,
  hourlyRate: Number,
  languages: [String],
  profileImage: String,
  gallery: [String],
  licenseNumber: String,
  video: String,
}, { timestamps: true });

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
