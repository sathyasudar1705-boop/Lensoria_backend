import express from "express";
import { signupUser, loginUser, getUserProfile, updateUserController, deleteUserController, getAllUsersController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile/:id", authMiddleware, getUserProfile);
router.put("/profile/:id", authMiddleware, updateUserController);
router.delete("/profile/:id", authMiddleware, deleteUserController);
router.get("/", authMiddleware, getAllUsersController);

export default router;
