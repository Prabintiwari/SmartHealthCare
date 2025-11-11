import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
        available: !docData.available
    })
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req,res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password, -email'])
    res.json({success:true, doctors})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments
const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId })
      .populate('userId', 'name email image dob phone address');

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to accept appointment by doctor
const appointmentAccept = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { status: "Accepted" });
      res.json({ success: true, message: "Appointment accepted" });
    } else {
      res.json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to decline appointment by doctor
const appointmentDecline = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { status: "Declined" });
      
      // Release the slot
      const { slotDate, slotTime } = appointmentData;
      const docData = await doctorModel.findById(docId);
      let slots_booked = docData.slots_booked;
      
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
      }
      
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
      
      res.json({ success: true, message: "Appointment declined" });
    } else {
      res.json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to complete appointment
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { 
        status: "Completed",
        isCompleted: true 
      });
      res.json({ success: true, message: "Appointment completed" });
    } else {
      res.json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available, about } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address: JSON.parse(address), available, about });

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for doctor dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    
    const appointments = await appointmentModel.find({ docId })
      .populate('userId', 'name email image dob phone address');
    
    let earnings = 0;
    appointments.forEach((item) => {
      if (item.payment && item.status === "Completed") {
        earnings += item.amount;
      }
    });
    
    let patients = [];
    appointments.forEach((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    };
    
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  changeAvailability, 
  doctorList, 
  loginDoctor, 
  doctorAppointments,
  appointmentAccept,
  appointmentDecline,
  appointmentComplete,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard
};
