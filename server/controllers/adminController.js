import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      degree,
      speciality,
      experience,
      fees,
      about,
    } = req.body;

    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !degree ||
      !speciality ||
      !experience ||
      !fees ||
      !about
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      address: JSON.parse(address),
      degree,
      speciality,
      experience,
      fees,
      image: imageUrl,
      date: Date.now(),
      about,
    };

    const newDoctor = await doctorModel.create(doctorData);

    await newDoctor.save();

    return res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Both fields are required",
      });
    }

    if (email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "Admin logged in successfully",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const allDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

    return res.json({
      success: true,
      message: "All Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const AppointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    return res.json({
      success: true,
      message: "All Appointments Fetched ",
      appointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const cancelAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (item) => item !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminDashBoard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      message: "Dashboard Data Fetched",
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  adminDashBoard,
  addDoctor,
  loginAdmin,
  allDoctor,
  AppointmentsAdmin,
  cancelAppointmentByAdmin,
};
