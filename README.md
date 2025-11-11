# SmartHealthCare - Healthcare Appointment Booking System

A complete healthcare appointment booking system with admin panel, doctor portal, and patient interface.

## Features

### Patient Features
- User registration and login
- Browse doctors by speciality
- Book appointments with available time slots
- Payment integration with eSewa (Nepal's payment gateway)
- View and manage appointments
- Cancel appointments
- Update profile with photo upload

### Admin Features
- Admin dashboard with statistics
- View all appointments with filtering
- Manage doctors (add, view, update availability)
- Cancel appointments
- View earnings and patient statistics

### Doctor Features
- Doctor login and dashboard
- View personal appointments
- Accept/Decline appointments
- Complete appointments
- Update profile and consultation fees
- Toggle availability
- View earnings and patient count

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS with DaisyUI
- Axios for API calls
- React Toastify for notifications
- FontAwesome icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads
- eSewa payment integration

### Admin/Doctor Panel
- React 18
- Shared codebase for admin and doctor portals
- Context API for state management
- Responsive design with dark mode

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (MongoDB Atlas or local)
- Cloudinary account
- eSewa merchant account (for payment integration)

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
PORT=9000
```

4. Start the backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```

### Frontend Setup

1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:9000
```

4. Start the frontend:
```bash
npm run dev
```

### Admin/Doctor Panel Setup

1. Navigate to Admin directory:
```bash
cd Admin
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:9000
```

4. Start the admin panel:
```bash
npm run dev
```

## Usage

### For Patients
1. Visit the frontend URL (default: http://localhost:5173)
2. Register or login
3. Browse doctors by speciality
4. Select a doctor and book an appointment
5. Complete payment using eSewa
6. Manage your appointments from "My Appointments" page

### For Admin
1. Visit the admin panel URL (default: http://localhost:5174)
2. Login with admin credentials
3. Add doctors, manage appointments, view statistics
4. Change doctor availability

### For Doctors
1. Visit the admin panel URL
2. Click "Doctor Login" and login with doctor credentials
3. View dashboard with earnings and appointments
4. Accept/Decline/Complete appointments
5. Update profile and consultation fees

## API Endpoints

### User Routes
- POST `/api/user/register` - Register user
- POST `/api/user/login` - Login user
- GET `/api/user/get-profile` - Get user profile
- POST `/api/user/update-profile` - Update user profile
- POST `/api/user/book-appointment` - Book appointment
- GET `/api/user/appointments` - Get user appointments
- POST `/api/user/cancel-appointment` - Cancel appointment
- POST `/api/user/payment-esewa` - Initiate eSewa payment
- POST `/api/user/verify-esewa` - Verify eSewa payment

### Doctor Routes
- GET `/api/doctor/list` - Get all doctors
- POST `/api/doctor/login` - Doctor login
- GET `/api/doctor/appointments` - Get doctor appointments
- POST `/api/doctor/appointment-accept` - Accept appointment
- POST `/api/doctor/appointment-decline` - Decline appointment
- POST `/api/doctor/appointment-complete` - Complete appointment
- GET `/api/doctor/profile` - Get doctor profile
- POST `/api/doctor/update-profile` - Update doctor profile
- GET `/api/doctor/dashboard` - Get doctor dashboard data
- POST `/api/doctor/change-availability` - Change availability

### Admin Routes
- POST `/api/admin/login` - Admin login
- POST `/api/admin/add-doctor` - Add new doctor
- POST `/api/admin/all-doctors` - Get all doctors
- POST `/api/admin/change-availability` - Change doctor availability
- GET `/api/admin/appointments` - Get all appointments
- POST `/api/admin/cancel-appointment` - Cancel appointment
- GET `/api/admin/dashboard` - Get admin dashboard data

## Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set up environment variables on your hosting platform
2. Deploy the Backend folder
3. Update CORS settings if needed

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` folder
3. Update `VITE_BACKEND_URL` to your backend URL

### Admin Panel Deployment

1. Build the admin panel:
```bash
npm run build
```

2. Deploy the `dist` folder
3. Update `VITE_BACKEND_URL` to your backend URL

## Environment Variables Summary

### Backend
- `MONGODB_URI` - MongoDB connection string
- `CLOUDINARY_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ADMIN_EMAIL` - Admin email for login
- `ADMIN_PASSWORD` - Admin password
- `JWT_SECRET` - Secret for JWT token generation
- `PORT` - Server port (default: 9000)

### Frontend & Admin
- `VITE_BACKEND_URL` - Backend API URL

## Security Notes

1. Never commit `.env` files to version control
2. Use strong passwords for admin accounts
3. Rotate JWT secrets regularly
4. Implement rate limiting in production
5. Use HTTPS in production
6. Validate all user inputs
7. Implement proper CORS settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email prabintiwari964@gmail.com or create an issue in the repository.

## Credits

Developed by Prabin Tiwari
