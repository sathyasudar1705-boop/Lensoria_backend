import { createPhotographer, findPhotographerByEmail } from "../services/photographers.services.js";
import { signupValidation } from "../schemas/photographer.schema.js";
import jwt from "jsonwebtoken";

export const signupPhotographer = async (req, res) => {
  try {
    // 1. Validate request body
    const { error, value } = signupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // 2. Check if email exists
    const existing = await findPhotographerByEmail(value.email);
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3. Create new photographer
    const newPhotographer = await createPhotographer(value);

    // 4. Generate Token
    const token = jwt.sign(
      { id: newPhotographer._id }, 
      process.env.SECRET_KEY, 
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newPhotographer._id,
        name: newPhotographer.name,
        email: newPhotographer.email
      }
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};