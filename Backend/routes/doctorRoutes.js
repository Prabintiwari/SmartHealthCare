import express from 'express'
import { 
  doctorList, 
  loginDoctor, 
  doctorAppointments,
  appointmentAccept,
  appointmentDecline,
  appointmentComplete,
  doctorProfile,
  updateDoctorProfile,
  doctorDashboard,
  changeAvailability
} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
import rateLimit from 'express-rate-limit'

const doctorRouter = express.Router()

// Stricter rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many login attempts, please try again later' }
});

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginLimiter, loginDoctor)
doctorRouter.get('/appointments', authDoctor, doctorAppointments)
doctorRouter.post('/appointment-accept', authDoctor, appointmentAccept)
doctorRouter.post('/appointment-decline', authDoctor, appointmentDecline)
doctorRouter.post('/appointment-complete', authDoctor, appointmentComplete)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.post('/change-availability', authDoctor, changeAvailability)

export default doctorRouter