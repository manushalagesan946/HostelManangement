import express from "express";
import roomController from "../controllers/roomController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, roomController.getAllRooms);

router.get("/:id", authenticate, roomController.getRoomById);

export default router;