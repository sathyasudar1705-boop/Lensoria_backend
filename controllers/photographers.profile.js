import Photographer from "../models/photographers.models.js";
import { profileValidation } from "../schemas/photographer.schema.js";

export const updateProfile = async (req, res) => {
  try {
    const { error, value } = profileValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user.id;

    const updatedUser = await Photographer.findByIdAndUpdate(userId, value, {
      new: true,
    });

    res.json({
      message: "Profile updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
