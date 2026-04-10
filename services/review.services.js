import Review from "../models/review.models.js";

export const createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

export const findReviewById = async (id) => {
  return await Review.findById(id).populate("userId photographerId");
};

export const findReviewsByPhotographerId = async (photographerId) => {
  return await Review.find({ photographerId }).populate("userId");
};

export const findReviewsByUserId = async (userId) => {
  return await Review.find({ userId }).populate("photographerId");
};

export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

export const getAllReviews = async () => {
  return await Review.find().populate("userId photographerId");
};
