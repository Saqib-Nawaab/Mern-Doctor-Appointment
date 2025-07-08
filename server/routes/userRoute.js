import express from "express";
import {
  getProfile,
  loginUser,
  bookAppointment,
  registerUser,
  updateProfile,
  listAppointment,
  cancelAppointment,
  paymentOnlineByStripe,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile",upload.single("image"),authUser,updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointment", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/stripe-payment", authUser, paymentOnlineByStripe);


export default userRouter;
