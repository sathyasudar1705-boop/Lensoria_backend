import express from "express";
import { signupPhotographer } from "../controllers/photographers.signup.js";
import { updateProfile } from "../controllers/photographers.profile.js";
import { loginPhotographer } from "../controllers/photographers.login.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

// Signup Route
router.post("/signup", signupPhotographer);
router.post("/", signupPhotographer);  // Generic create-user

// Login Route
router.post("/login", loginPhotographer);

// Profile Route (Needs Auth)
router.put("/profile", authMiddleware, updateProfile);

export default router;



