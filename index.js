import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import photographerRouter from "./routers/photographer.router.js";
import userRouter from "./routers/user.router.js";
import bookingRouter from "./routers/booking.router.js";
import reviewRouter from "./routers/review.router.js";
import categoryRouter from "./routers/category.router.js";

/* ---------------- SAFE DOTENV LOAD ---------------- */
// Only load .env locally (NOT in Render)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

/* ---------------- PORT ---------------- */
const PORT = process.env.PORT || 5000;

/* ---------------- MONGO URL ---------------- */
const MONGO_URL = process.env.MONGO_URL;

// safety check (IMPORTANT)
if (!MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in environment variables");
  process.exit(1);
}

/* ---------------- CORS ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://studio-rho-orcin.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked CORS:", origin);
        return callback(new Error("CORS blocked for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.options("*", cors());

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ---------------- ROUTES ---------------- */
app.use("/api/photographers", photographerRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/categories", categoryRouter);

/* ---------------- HOME ROUTE ---------------- */
app.get("/", (req, res) => {
  res.json({
    status: "Server is running 🚀",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

/* ---------------- DB CONNECT ---------------- */
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------------- START SERVER ---------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});