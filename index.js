import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import photographerRouter from "./routers/photographer.router.js";
import userRouter from "./routers/user.router.js";
import bookingRouter from "./routers/booking.router.js";
import portfolioRouter from "./routers/portfolio.router.js";
import reviewRouter from "./routers/review.router.js";
import categoryRouter from "./routers/category.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("ERROR: MONGO_URL is not defined in .env file");
}


mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Please check if your IP address is whitelisted in MongoDB Atlas");
  });

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.json({ status: "Server is running", database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" });
});


app.use("/api/photographers", photographerRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/portfolios", portfolioRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

