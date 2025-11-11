import validator from "validator";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { json } from "express";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
//API for adding doctors

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    //check if all fields are filled
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    // validating password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    // hashing password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // uploading image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imgUrl = imageUpload.secure_url;

    // saving doctor to database
    const doctorData = {
      name,
      email,
      image: imgUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for the admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to get all appointments for admin
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
      .populate('userId', 'name email image dob')
      .populate('docId', 'name speciality image');
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin dashboard
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.find({})
      .populate('userId', 'name email image dob')
      .populate('docId', 'name speciality image');
    
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: new Set(appointments.map(app => app.userId?._id?.toString()).filter(id => id)).size,
      latestAppointments: appointments.reverse().slice(0, 5)
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment by admin
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    await appointmentModel.findByIdAndUpdate(appointmentId, { 
      cancelled: true,
      status: "Cancelled" 
    });

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard };
