import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';


//app config
const app = express();
const port = process.env.PORT || 9000;
connectDB()
connectCloudinary()

//middleware
app.use(express.json());
app.use(cors());

//Api Endpoints
app.use('/api/admin',adminRouter)
//localhost:9000/api/admin/add-doctor

app.get('/', (req, res) => {
    res.send('Hello World from Express');
});

app.listen(port, () => {
    console.log(`Server is running on port`,port);
});