import Photographer from "../models/photographers.models.js";
import bcrypt from "bcryptjs";

export const createPhotographer = async (data) => {

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const photographer = new Photographer({
    ...data,
    password: hashedPassword,
  });

  return await photographer.save();
};

export const findPhotographerByEmail = async (email) => {
  return await Photographer.findOne({ email });
};