import Portfolio from "../models/portfolio.models.js";

export const createPortfolio = async (data) => {
  const portfolio = new Portfolio(data);
  return await portfolio.save();
};

export const findPortfolioById = async (id) => {
  return await Portfolio.findById(id).populate("photographerId");
};

export const findPortfoliosByPhotographerId = async (photographerId) => {
  return await Portfolio.find({ photographerId });
};

export const updatePortfolio = async (id, data) => {
  return await Portfolio.findByIdAndUpdate(id, data, { new: true });
};

export const deletePortfolio = async (id) => {
  return await Portfolio.findByIdAndDelete(id);
};

export const getAllPortfolios = async () => {
  return await Portfolio.find().populate("photographerId");
};
