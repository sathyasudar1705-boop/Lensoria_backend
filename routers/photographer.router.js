import express from "express";
import { signupPhotographer } from "../controllers/photographers.signup.js";
import { updateProfile, getProfile, uploadImage, getPhotographers } from "../controllers/photographers.profile.js";
import { loginPhotographer } from "../controllers/photographers.login.js";
import { authMiddleware } from "../middleware/Auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public Routes
router.get("/", getPhotographers);
router.post("/signup", signupPhotographer);
router.post("/login", loginPhotographer);

// Profile Routes (Needs Auth)
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.post("/upload-image", authMiddleware, upload.single("image"), uploadImage);

export default router;



