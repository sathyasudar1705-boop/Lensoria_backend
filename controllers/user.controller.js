import { createUser, findUserByEmail, findUserById, updateUser, deleteUser, getAllUsers } from "../services/user.services.js";
import { userSignupValidation, userUpdateValidation } from "../schemas/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { error, value } = userSignupValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existing = await findUserByEmail(value.email);
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newUser = await createUser(value);
    const token = jwt.sign({ id: newUser._id, role: "user" }, process.env.SECRET_KEY, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "user" }, process.env.SECRET_KEY, { expiresIn: "7d" });
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { error, value } = userUpdateValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedUser = await updateUser(req.params.id, value);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const userId = req.params.id;
    const imageUrl = req.file.path; // Cloudinary URL

    const updatedUser = await updateUser(userId, { profile_image: imageUrl });
    
    res.status(200).json({
      message: "Profile picture updated successfully",
      profile_image: imageUrl,
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
