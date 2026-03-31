import axios from "axios";
const API_URL = "http://localhost:5000/api";

const bookingService = {
  // Confirm the final booking (Backend: parkingController.confirmBooking)
  confirm: (bookingData) =>
    axios.post(`${API_URL}/booking/confirm`, bookingData),

  // Get user's personal bookings
  getUserBookings: (userId) => axios.get(`${API_URL}/my-bookings/${userId}`),
};

export default bookingService;
