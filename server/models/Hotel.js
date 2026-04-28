import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  city: { type: String, required: true },

  // 🔥 ADD THESE
  languages: { type: String },
  experience: { type: Number },
  bio: { type: String },

  profilePic: { type: String },   // image filename
  introVideo: { type: String }    // video filename

}, { timestamps: true });

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;