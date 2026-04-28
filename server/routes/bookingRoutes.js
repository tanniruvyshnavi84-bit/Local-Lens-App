import express from "express";
import { createBooking, getUserBookings, cancelBooking, getBookingsByGuide, updateBookingStatus, processPayment } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", protect, createBooking);
bookingRouter.get("/my-bookings", protect, getUserBookings);
bookingRouter.get("/guide/:guideId", protect, getBookingsByGuide);
bookingRouter.patch("/:id", protect, updateBookingStatus);
bookingRouter.patch("/:id/pay", protect, processPayment);
bookingRouter.patch("/:id/cancel", protect, cancelBooking);

export default bookingRouter;
