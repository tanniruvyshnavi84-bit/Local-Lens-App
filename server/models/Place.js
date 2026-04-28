import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  description: String,
  imageUrl: String,
  rating: { type: Number, default: 0 }
}, { timestamps: true });

const Place = mongoose.model("Place", placeSchema);
export default Place;
