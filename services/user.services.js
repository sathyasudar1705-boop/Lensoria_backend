import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({
    ...data,
    password: hashedPassword,
  });
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const getAllUsers = async () => {
  return await User.find();
};
