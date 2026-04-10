import { findPhotographerByEmail } from "../services/photographers.services.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginPhotographer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Find user by email
    const photographer = await findPhotographerByEmail(email);
    if (!photographer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Check password
    const isMatched = await bcrypt.compare(password, photographer.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate token
    const token = jwt.sign({ id: photographer._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: photographer._id,
        name: photographer.name,
        email: photographer.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
