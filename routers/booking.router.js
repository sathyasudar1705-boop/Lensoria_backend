import express from "express";
import { createBookingController, getBookingByIdController, getBookingsByUserController, getBookingsByPhotographerController, updateBookingStatusController, deleteBookingController, getAllBookingsController } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authMiddleware, createBookingController);
router.get("/:id", authMiddleware, getBookingByIdController);
router.get("/user/:userId", authMiddleware, getBookingsByUserController);
router.get("/photographer/:photographerId", authMiddleware, getBookingsByPhotographerController);
router.put("/:id/status", authMiddleware, updateBookingStatusController);
router.delete("/:id", authMiddleware, deleteBookingController);
router.get("/", authMiddleware, getAllBookingsController);

export default router;
