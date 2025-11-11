import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/UserRoute.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';


//app config
const app = express();
const port = process.env.PORT || 9000;
connectDB()
connectCloudinary()

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Add security headers

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: { success: false, message: 'Too many login attempts, please try again later' }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later' }
});

// Apply general rate limiting to all API routes
app.use('/api/', apiLimiter);

//Api Endpoints
app.use('/api/admin',adminRouter)
//localhost:9000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
    res.send('Hello World from Express');
});

app.listen(port, () => {
    console.log(`Server is running on port`,port);
});