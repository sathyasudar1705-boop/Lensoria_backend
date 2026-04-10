import Category from "../models/category.models.js";

export const createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

export const findCategoryById = async (id) => {
  return await Category.findById(id);
};

export const findCategoryByName = async (name) => {
  return await Category.findOne({ name });
};

export const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

export const getAllCategories = async () => {
  return await Category.find();
};
