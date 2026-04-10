import { createReview, findReviewById, findReviewsByPhotographerId, findReviewsByUserId, updateReview, deleteReview, getAllReviews } from "../services/review.services.js";
import { reviewValidation } from "../schemas/review.schema.js";
import User from "../models/user.models.js";
import Photographer from "../models/photographers.models.js";

export const createReviewController = async (req, res) => {
  try {
    const { error, value } = reviewValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // 1. Check if user exists
    const userExist = await User.findById(value.userId);
    if (!userExist) return res.status(404).json({ message: "User not found" });

    // 2. Check if photographer exists
    const photographerExist = await Photographer.findById(value.photographerId);
    if (!photographerExist) return res.status(404).json({ message: "Photographer not found" });

    const newReview = await createReview(value);
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewByIdController = async (req, res) => {
  try {
    const review = await findReviewById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByPhotographerController = async (req, res) => {
  try {
    const reviews = await findReviewsByPhotographerId(req.params.photographerId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByUserController = async (req, res) => {
  try {
    const reviews = await findReviewsByUserId(req.params.userId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReviewController = async (req, res) => {
  try {
    const { error, value } = reviewValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedReview = await updateReview(req.params.id, value);
    res.status(200).json({ message: "Review updated", review: updatedReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReviewController = async (req, res) => {
  try {
    await deleteReview(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllReviewsController = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
