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
      returnDocument: "after",
    });

    res.json({
      message: "Profile updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const photographer = await Photographer.findById(userId);
    res.json(photographer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadImage = async (req, res) => {
    try {
        console.log("Upload request received for user:", req.user?.id);
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const userId = req.user.id;
        const imageUrl = req.file.path; // Cloudinary returns the full URL in .path

        // Automatically store the image URL in the photographer's portfolio in the DB
        await Photographer.findByIdAndUpdate(userId, {
            $push: { portfolio: imageUrl }
        }, { returnDocument: "after" });

        res.json({ 
            imageUrl,
            message: "Image uploaded and stored in your portfolio"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPhotographers = async (req, res) => {
    try {
        const photographers = await Photographer.find({});
        res.json(photographers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
