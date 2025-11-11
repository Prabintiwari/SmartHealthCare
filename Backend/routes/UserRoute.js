import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentEsewa, verifyEsewa } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import rateLimit from 'express-rate-limit';

const userRouter = express.Router();

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many attempts, please try again later' }
});

userRouter.post('/register', authLimiter, registerUser);
userRouter.post('/login', authLimiter, loginUser);
userRouter.get('/get-profile',authUser, getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser, updateProfile);
userRouter.post('/book-appointment',authUser, bookAppointment);
userRouter.get('/appointments',authUser, listAppointments);
userRouter.post('/cancel-appointment',authUser, cancelAppointment);
userRouter.post('/payment-esewa', authUser, paymentEsewa);
userRouter.post('/verify-esewa', verifyEsewa);

export default userRouter;


