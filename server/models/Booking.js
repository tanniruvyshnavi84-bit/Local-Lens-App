import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'ongoing', 'completed', 'rejected', 'cancelled'], default: 'pending' },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;