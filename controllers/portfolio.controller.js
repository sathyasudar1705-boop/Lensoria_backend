import { createPortfolio, findPortfolioById, findPortfoliosByPhotographerId, updatePortfolio, deletePortfolio, getAllPortfolios } from "../services/portfolio.services.js";
import { portfolioValidation } from "../schemas/portfolio.schema.js";
import Photographer from "../models/photographers.models.js";

export const createPortfolioController = async (req, res) => {
  try {
    const { error, value } = portfolioValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // 1. Check if photographer exists
    const photographerExist = await Photographer.findById(value.photographerId);
    if (!photographerExist) return res.status(404).json({ message: "Photographer not found" });

    const newPortfolio = await createPortfolio(value);
    res.status(201).json({ message: "Portfolio item created", portfolio: newPortfolio });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPortfolioByIdController = async (req, res) => {
  try {
    const portfolio = await findPortfolioById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio item not found" });
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPortfoliosByPhotographerController = async (req, res) => {
  try {
    const portfolios = await findPortfoliosByPhotographerId(req.params.photographerId);
    res.status(200).json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePortfolioController = async (req, res) => {
  try {
    const { error, value } = portfolioValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedPortfolio = await updatePortfolio(req.params.id, value);
    res.status(200).json({ message: "Portfolio updated", portfolio: updatedPortfolio });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePortfolioController = async (req, res) => {
  try {
    await deletePortfolio(req.params.id);
    res.status(200).json({ message: "Portfolio deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPortfoliosController = async (req, res) => {
  try {
    const allPortfolios = await getAllPortfolios();
    res.status(200).json(allPortfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
