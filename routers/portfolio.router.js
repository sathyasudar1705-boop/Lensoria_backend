import express from "express";
import { createPortfolioController, getPortfolioByIdController, getPortfoliosByPhotographerController, updatePortfolioController, deletePortfolioController, getAllPortfoliosController } from "../controllers/portfolio.controller.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authMiddleware, createPortfolioController);
router.get("/:id", getPortfolioByIdController);
router.get("/photographer/:photographerId", getPortfoliosByPhotographerController);
router.put("/:id", authMiddleware, updatePortfolioController);
router.delete("/:id", authMiddleware, deletePortfolioController);
router.get("/", getAllPortfoliosController);

export default router;
