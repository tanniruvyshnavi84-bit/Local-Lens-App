import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  imageUrl: String,
  description: String
}, { timestamps: true });

const City = mongoose.model("City", citySchema);
export default City;
