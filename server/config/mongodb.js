import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => {
      console.log("Error in DB connection:", err);
    });
};

export default connectDB;
