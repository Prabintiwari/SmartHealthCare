# Testing Guide - SmartHealthCare

This guide will help you test all the functionality to ensure everything is working correctly.

## Prerequisites

1. **Start the Backend Server**
   ```bash
   cd Backend
   node server.js
   ```
   The server should start on port 9000 (or your configured PORT)

2. **Start the Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend should start on http://localhost:5173

3. **Start the Admin/Doctor Panel**
   ```bash
   cd Admin
   npm run dev
   ```
   Admin panel should start on http://localhost:5174

## Testing Login/Signup (Frontend)

### Test Signup
1. Open http://localhost:5173
2. Click on "Login" button in navbar
3. The login modal should appear
4. Click "Click here" under "Create a new account?"
5. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
6. Click "Create Account"
7. You should see:
   - ✅ Success toast: "Account created successfully!"
   - ✅ Modal should close
   - ✅ You should be redirected to home page
   - ✅ Navbar should show user profile icon/name

### Test Login
1. If not already logged in, click "Login" in navbar
2. Make sure you're on "Login" tab (not "Sign Up")
3. Fill in:
   - Email: test@example.com
   - Password: password123
4. Click "Login"
5. You should see:
   - ✅ Success toast: "Login successful!"
   - ✅ Modal should close
   - ✅ Redirected to home page
   - ✅ User profile accessible

### Test Form Validation
1. Try to submit empty form
2. You should see browser validation errors for required fields
3. Try invalid email format
4. Browser should show "Please include an '@' in the email address"

## Testing Appointment Booking

### Prerequisites
- You must be logged in as a user
- At least one doctor must be added (do this from Admin panel first)

### Test Steps
1. **Browse Doctors**
   - Go to http://localhost:5173/doctors
   - You should see a list of available doctors
   - Click "Book Appointment" on any doctor

2. **Select Date and Time**
   - You should see doctor details
   - Booking slots should appear with dates
   - Click on a date to select it
   - Time slots should appear below
   - Click on a time slot to select it
   - Selected date should be highlighted in blue
   - Selected time should be highlighted in blue

3. **Book Appointment**
   - Click "Book an Appointment" button
   - If not logged in, should prompt to login
   - If time slot not selected, should show error: "Please select a time slot"
   - On success:
     - ✅ Success toast: "Appointment booked successfully"
     - ✅ Redirect to "My Appointments" page
     - ✅ New appointment should appear in the list

4. **Test Without Login**
   - Logout if logged in
   - Try to book an appointment
   - Should show: "Please login to book an appointment"
   - Login modal should appear

5. **Test Without Time Selection**
   - Login
   - Select a doctor
   - Select a date but DON'T select a time
   - Click "Book an Appointment"
   - Should show error: "Please select a time slot"

## Testing My Appointments (Frontend)

1. Login as a user who has booked appointments
2. Go to http://localhost:5173/my-appointments
3. You should see:
   - ✅ List of your appointments
   - ✅ Doctor name and speciality
   - ✅ Appointment date and time
   - ✅ Consultation fees (NPR amount)
   - ✅ Status badge with color:
     - Yellow: Pending
     - Green: Accepted
     - Red: Declined/Cancelled
     - Blue: Completed
   - ✅ Payment status (Paid/Unpaid)

4. **Test Payment**
   - Click "Pay with eSewa" on an unpaid appointment
   - Should show info toast about demo mode
   - Payment should be marked as successful
   - Status should update to "Accepted"
   - "✓ Payment Completed" should appear

5. **Test Cancel**
   - Click "Cancel appointment" on a pending appointment
   - Should show success message
   - Status should change to "Cancelled"
   - Buttons should no longer be available

## Testing Admin Portal

### Admin Login
1. Go to http://localhost:5174
2. Login with admin credentials:
   - Email: prabintiwari964@gmail.com
   - Password: Prabintiwari@#123
3. Should see admin dashboard

### Admin Dashboard
1. Should see 4 statistic cards:
   - Total Doctors
   - Total Appointments
   - Total Patients
   - Latest Appointments count
2. Should see "Latest Appointments" table with:
   - Patient info with photo
   - Doctor info with photo
   - Date and time
   - Status badge (color-coded)
   - Payment status
   - Cancel button

### Add Doctor
1. Click "Add Doctor" in sidebar
2. Fill in all doctor information:
   - Upload doctor photo
   - Name, Email, Password
   - Speciality, Degree, Experience
   - About section
   - Fees
   - Address (line 1 and line 2)
3. Click "Add Doctor"
4. Should see success message
5. Doctor should appear in "Doctors List"

### All Appointments
1. Click "Appointments" in sidebar
2. Should see comprehensive table with:
   - Appointment number
   - Patient details (photo, name, email, age)
   - Doctor details (photo, name, speciality)
   - Date and time
   - Fees
   - Status badge
   - Payment status
   - Cancel button (if not already cancelled)

### Doctors List
1. Click "Doctors List" in sidebar
2. Should see all doctors with:
   - Photo
   - Name, speciality, degree
   - Availability toggle (checkmark)
3. Click checkmark to toggle availability
4. Should see success message

## Testing Doctor Portal

### Doctor Login
1. Go to http://localhost:5174
2. Click "Doctor Login?" link
3. Login with a doctor's credentials:
   - Email: (the email you used when adding doctor)
   - Password: (the password you used)
4. Should see doctor dashboard

### Doctor Dashboard
1. Should see 4 statistic cards:
   - Earnings (NPR amount)
   - Total Appointments
   - Total Patients
   - Latest Appointments count
2. Should see "Latest Appointments" table
3. For pending appointments, should see:
   - "Accept" button (green)
   - "Decline" button (red)
4. For accepted appointments, should see:
   - "Complete" button (blue)

### Doctor Appointments
1. Click "Appointments" in sidebar
2. Should see comprehensive table of all doctor's appointments
3. Test appointment actions:
   - Click "Accept" on pending appointment
     - Status should change to "Accepted"
     - Should see success message
   - Click "Decline" on pending appointment
     - Status should change to "Declined"
     - Time slot should be released
   - Click "Complete" on accepted appointment
     - Status should change to "Completed"
     - Should see success message

### Doctor Profile
1. Click "Profile" in sidebar
2. Should see doctor's profile with:
   - Photo
   - Name, email
   - Degree, speciality, experience
   - Consultation fees
   - Address
   - About section
   - Availability checkbox
3. Click "Edit Profile"
4. Modify:
   - Consultation fees
   - Address lines
   - About section
   - Availability checkbox
5. Click "Save Changes"
6. Should see success message
7. Changes should be reflected

## Common Issues and Solutions

### Issue: Login/Signup not working
**Solution**: 
- Check browser console for errors
- Verify backend is running on port 9000
- Check .env file has correct VITE_BACKEND_URL
- Clear browser cache and localStorage
- Try with different credentials

### Issue: Appointment booking fails
**Solution**:
- Ensure you're logged in
- Select both date AND time slot
- Check backend console for errors
- Verify doctor has slots available
- Check network tab for API response

### Issue: Modal doesn't close
**Solution**:
- Click the X button
- Check browser console for navigation errors
- Refresh the page

### Issue: Payment not processing
**Solution**:
- This is demo mode, should work automatically
- Check browser console
- Verify appointment exists
- Check backend logs

### Issue: Images not loading
**Solution**:
- Check Cloudinary credentials in backend .env
- Verify image upload succeeded
- Check network tab for 404 errors

## API Testing with Curl

### Test User Registration
```bash
curl -X POST http://localhost:9000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Test User Login
```bash
curl -X POST http://localhost:9000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Doctor List
```bash
curl http://localhost:9000/api/doctor/list
```

### Test Admin Login
```bash
curl -X POST http://localhost:9000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"prabintiwari964@gmail.com","password":"Prabintiwari@#123"}'
```

## Rate Limiting Tests

### Test Auth Rate Limit (Should fail after 5 attempts)
```bash
for i in {1..6}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:9000/api/user/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
  echo ""
done
```

On the 6th attempt, you should see:
```json
{"success":false,"message":"Too many attempts, please try again later"}
```

## Security Checks

1. **HTTPS in Production**: Verify all requests use HTTPS
2. **JWT Tokens**: Check tokens are stored securely in localStorage
3. **Password**: Verify passwords are not visible in network tab
4. **CORS**: Check CORS headers in network tab
5. **Rate Limiting**: Test exceeding rate limits
6. **Input Validation**: Try SQL injection strings
7. **XSS**: Try script tags in inputs

## Success Criteria

All features working means:
- ✅ User can register and login
- ✅ User can browse doctors
- ✅ User can book appointments with date/time selection
- ✅ User can view their appointments
- ✅ User can make payments (demo mode)
- ✅ User can cancel appointments
- ✅ Admin can login
- ✅ Admin can see dashboard statistics
- ✅ Admin can add doctors
- ✅ Admin can view all appointments
- ✅ Admin can cancel appointments
- ✅ Doctor can login
- ✅ Doctor can see dashboard with earnings
- ✅ Doctor can accept/decline appointments
- ✅ Doctor can complete appointments
- ✅ Doctor can update profile
- ✅ Doctor can toggle availability
- ✅ All status updates reflect immediately
- ✅ All toasts show appropriate messages
- ✅ Rate limiting prevents abuse
- ✅ Security headers are present

## Next Steps After Testing

If all tests pass:
1. ✅ Create production .env files
2. ✅ Update CORS origins for production domains
3. ✅ Deploy backend to Render/Railway/Heroku
4. ✅ Deploy frontend to Vercel/Netlify
5. ✅ Deploy admin panel to Vercel/Netlify
6. ✅ Configure eSewa production credentials
7. ✅ Set up monitoring and logging
8. ✅ Perform security audit
9. ✅ Load testing
10. ✅ User acceptance testing

---

**If you encounter any issues, check:**
1. Browser console for frontend errors
2. Backend terminal for API errors
3. Network tab for failed requests
4. MongoDB connection status
5. Environment variables are correctly set
