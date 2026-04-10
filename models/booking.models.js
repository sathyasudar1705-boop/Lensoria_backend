import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    photographerId: { type: mongoose.Schema.Types.ObjectId, ref: "Photographer", required: true },
    bookingDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    amount: { type: Number, required: true },
    notes: String,
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
