import mongoose from "mongoose";

const photographerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    category: String,
    bio: String,
    experience_years: Number,
    camera_model: [String],
    price: Number,
    city: String,
    state: String,
    profile_pic: String,
    portfolio: [String], // Array of image URLs
    packages: [
      {
        title: String,
        price: Number,
        duration: String,
        deliverables: String,
        description: String,
        features: [String]
      }
    ],
    social_links: {
      instagram: String,
      facebook: String,
      website: String
    },
    unavailable_dates: [String]
  },
  { timestamps: true },
);

export default mongoose.model("Photographer", photographerSchema);
