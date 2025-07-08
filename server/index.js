import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config.js";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

connectDB();
connectCloudinary();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
