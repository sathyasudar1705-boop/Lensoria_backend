import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    photographerId: { type: mongoose.Schema.Types.ObjectId, ref: "Photographer", required: true },
    title: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: String,
    thumbnail: String,
  },
  { timestamps: true },
);

export default mongoose.model("Portfolio", portfolioSchema);
