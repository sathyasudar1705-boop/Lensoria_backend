import express from "express";
import { createCategoryController, getCategoryByIdController, updateCategoryController, deleteCategoryController, getAllCategoriesController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authMiddleware, createCategoryController);
router.get("/:id", getCategoryByIdController);
router.get("/", getAllCategoriesController);
router.put("/:id", authMiddleware, updateCategoryController);
router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;
