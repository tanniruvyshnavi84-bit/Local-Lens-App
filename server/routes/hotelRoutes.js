import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";
import upload from "../middleware/uploadMiddleware.js";
import Hotel from "../models/Hotel.js"; // ✅ IMPORT MODEL
import { getMyHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

// ✅ POST (already exists)
hotelRouter.post(
  '/',
  protect,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "introVideo", maxCount: 1 }
  ]),
  registerHotel
);

// ✅ ADD THIS GET ROUTE
hotelRouter.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("owner");
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

hotelRouter.get("/me", protect, getMyHotel);

export default hotelRouter;