import express from "express";
import bookingController from "../controllers/bookingController.js";
import authenticate from "../middleware/authMiddleware.js";
import authorizeAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authenticate, bookingController.submitBooking);

router.get(
    "/pending",
    authenticate,
    authorizeAdmin,
    bookingController.getPendingBookings
);

export default router;