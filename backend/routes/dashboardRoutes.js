import express from "express";

import dashboardController from "../controllers/dashboardController.js";

import authenticate from "../middleware/authMiddleware.js";

import authorizeAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authenticate,
    authorizeAdmin,
    dashboardController.getDashboard
);

export default router;