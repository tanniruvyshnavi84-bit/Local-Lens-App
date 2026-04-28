import Booking from "../models/Booking.js";
import Guide from "../models/Guide.js";
import User from "../models/User.js";
import { getAuth } from "@clerk/express";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { guideId, placeId, date, timeSlot, totalPrice } = req.body;
    const auth = getAuth(req);
    const authId = auth?.userId;

    console.log("Create Booking Request:", { authId, guideId, placeId, date, timeSlot });

    if (!authId) {
        return res.status(401).json({ success: false, message: "Unauthenticated: No clerk userId found in request." });
    }

    const user = await User.findOne({ clerkId: authId });
    if (!user) {
      console.error("User sync error: Clerk user exists but not found in MongoDB for ID:", authId);
      return res.status(404).json({ success: false, message: "User profile not found in database. Please try logging out and back in." });
    }

    console.log("Found User for Booking:", { mongoId: user._id, name: user.name });

    const booking = new Booking({
      userId: user._id,
      guideId: guideId,
      placeId: placeId,
      date: date || "Flexible",
      timeSlot: timeSlot,
      totalPrice: totalPrice,
      status: "pending"
    });

    console.log("Booking instance created, about to save...");
    const savedBooking = await booking.save();
    console.log("Booking saved successfully:", savedBooking._id);

    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.error("CRITICAL BOOKING ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      debugInfo: {
        userIdProvided: user?._id,
        userIdType: typeof user?._id,
        body: req.body
      }
    });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const auth = getAuth(req);
    const authId = auth?.userId;
    const user = await User.findOne({ clerkId: authId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const bookings = await Booking.find({ userId: user._id })
      .populate('guideId')
      .populate('placeId');
      
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const auth = getAuth(req);
    const authId = auth?.userId;
    const user = await User.findOne({ clerkId: authId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: user._id },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found or not authorized" });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings for a specific guide
export const getBookingsByGuide = async (req, res) => {
  try {
    const bookings = await Booking.find({ guideId: req.params.guideId }).populate('userId placeId');
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status (Accept/Reject)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Process Payment (Mock)
export const processPayment = async (req, res) => {
    try {
        const auth = getAuth(req);
        const authId = auth?.userId;
        const user = await User.findOne({ clerkId: authId });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, userId: user._id },
            { paymentStatus: 'paid' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found or not authorized" });
        }

        res.json({ success: true, message: "Payment successful", booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};