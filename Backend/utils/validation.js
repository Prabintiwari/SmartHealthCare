import mongoose from 'mongoose';

// Validate MongoDB ObjectId
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Validate appointment ID
export const validateAppointmentId = (appointmentId) => {
  if (!appointmentId) {
    return { valid: false, message: "Appointment ID is required" };
  }
  if (!isValidObjectId(appointmentId)) {
    return { valid: false, message: "Invalid appointment ID" };
  }
  return { valid: true };
};

// Validate doctor ID
export const validateDoctorId = (docId) => {
  if (!docId) {
    return { valid: false, message: "Doctor ID is required" };
  }
  if (!isValidObjectId(docId)) {
    return { valid: false, message: "Invalid doctor ID" };
  }
  return { valid: true };
};

// Validate user ID
export const validateUserId = (userId) => {
  if (!userId) {
    return { valid: false, message: "User ID is required" };
  }
  if (!isValidObjectId(userId)) {
    return { valid: false, message: "Invalid user ID" };
  }
  return { valid: true };
};
