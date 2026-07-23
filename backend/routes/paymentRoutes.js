import express from "express";
import paymentController from "../controllers/paymentController.js";
import authenticate from "../middleware/authMiddleware.js";
import authorizeAdmin from "../middleware/adminMiddleware.js";
const router = express.Router();
router.get(
    "/",
    authenticate,
    authorizeAdmin,
    paymentController.getAllPayments
);
router.post(
    "/",
    authenticate,
    paymentController.makePayment
);
export default router;