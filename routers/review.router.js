import express from "express";
import { createReviewController, getReviewByIdController, getReviewsByPhotographerController, getReviewsByUserController, updateReviewController, deleteReviewController, getAllReviewsController } from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authMiddleware, createReviewController);
router.get("/:id", getReviewByIdController);
router.get("/photographer/:photographerId", getReviewsByPhotographerController);
router.get("/user/:userId", getReviewsByUserController);
router.put("/:id", authMiddleware, updateReviewController);
router.delete("/:id", authMiddleware, deleteReviewController);
router.get("/", getAllReviewsController);

export default router;
