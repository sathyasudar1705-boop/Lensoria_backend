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
  },
  { timestamps: true },
);

export default mongoose.model("Photographer", photographerSchema);
