import { createCategory, findCategoryById, findCategoryByName, updateCategory, deleteCategory, getAllCategories } from "../services/category.services.js";
import { categoryValidation } from "../schemas/category.schema.js";

export const createCategoryController = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existing = await findCategoryByName(value.name);
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const newCategory = await createCategory(value);
    res.status(201).json({ message: "Category created", category: newCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategoryByIdController = async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { error, value } = categoryValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedCategory = await updateCategory(req.params.id, value);
    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
