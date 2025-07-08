import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({
      success: true,
      message: "Availability Changed ",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    return res.json({
      success: true,
      message: "All Doctors Fetched",
      doctors,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Both fields are required",
      });
    }

    const Doctor = await doctorModel.findOne({ email });

    if (!Doctor) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isMatch = await bcrypt.compare(password, Doctor.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: Doctor._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "Doctor logged in successfully",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    // const  docId  = req.body;
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId: docId });

    res.json({
      success: true,
      message: "Doctor Appointments",
      appointments,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.docId !== docId) {
      return res.json({
        success: false,
        message: "You are not authorized",
      });
    }

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      res.json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;

    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.docId !== docId) {
      return res.json({
        success: false,
        message: "You are not authorized",
      });
    }

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      res.json({
        success: false,
        message: "Cannot Cancel",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId: docId });

    let earning = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    res.json({
      success: true,
      message: "Dashboard Data Fetched",
      dashData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;

    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({
      success: true,
      message: "Profile Data Fetched",
      profileData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;

    const { address, available, fees } = req.body;
  

    await doctorModel.findByIdAndUpdate(docId, {
      address,
      fees,
      available,
    });



    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
};
