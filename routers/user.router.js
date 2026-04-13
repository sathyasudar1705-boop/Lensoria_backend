import express from "express";
import { signupUser, loginUser, getUserProfile, updateUserController, deleteUserController, getAllUsersController, uploadProfileImage } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/Auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile/:id", authMiddleware, getUserProfile);
router.put("/profile/:id", authMiddleware, updateUserController);
router.post("/upload-profile/:id", authMiddleware, upload.single("image"), uploadProfileImage);
router.delete("/profile/:id", authMiddleware, deleteUserController);
router.get("/", authMiddleware, getAllUsersController);

export default router;
