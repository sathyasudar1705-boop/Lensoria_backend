import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    photographerId: { type: mongoose.Schema.Types.ObjectId, ref: "Photographer", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true },
);

export default mongoose.model("Review", reviewSchema);
