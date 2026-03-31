import axios from "axios";

const API_URL = "http://localhost:5000/api";

const parkingService = {
  // 1. Get All Active Parkings
  getAllParkings: () => axios.get(`${API_URL}/parkings`),

  // 2. Get Parking Details + Available Slots
  getParkingDetails: (id, startTime, endTime) => {
    const params = [];
    if (startTime) params.push(`startTime=${encodeURIComponent(startTime)}`);
    if (endTime) params.push(`endTime=${encodeURIComponent(endTime)}`);
    const query = params.length ? `?${params.join("&")}` : "";
    return axios.get(`${API_URL}/parking/${id}${query}`);
  },

  // 3. Temporary Slot Lock (5 mins)
  lockSlot: (slotId) => axios.post(`${API_URL}/slot/lock`, { slotId }),

// 4. Confirm Booking
  confirmBooking: (bookingData) =>
    axios.post(`${API_URL}/booking/confirm`, bookingData),

  // NEW: Simple book slot for Find Parking
  bookSlot: (bookingData) => axios.post(`${API_URL}/book`, bookingData),

  // NEW: Get user bookings history
  getUserBookings: (userId) => axios.get(`${API_URL}/bookings/${userId}`),
};

export default parkingService;
