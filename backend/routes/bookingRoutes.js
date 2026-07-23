import express from "express";
import bookingController from "../controllers/bookingController.js";
import authenticate from "../middleware/authMiddleware.js";
import authorizeAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();
router.get(
    "/",
    authenticate,
    authorizeAdmin,
    bookingController.getAllBookings
);

router.post("/", authenticate, bookingController.submitBooking);

router.get(
    "/pending",
    authenticate,
    authorizeAdmin,
    bookingController.getPendingBookings
);
router.get(
    "/my",
    authenticate,
    bookingController.getMyBookings
);
router.put(
    "/:requestId/approve",
    authenticate,
    authorizeAdmin,
    bookingController.approveBooking
);
router.put(
    "/:id/reject",
    authenticate,
    authorizeAdmin,
    bookingController.rejectBooking
);

export default router;