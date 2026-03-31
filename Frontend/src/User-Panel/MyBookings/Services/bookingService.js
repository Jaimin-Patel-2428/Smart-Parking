import api from "../../../Shared/Services/api";

const bookingService = {
  // Get all user bookings (history)
  getUserBookings: (userId) => api.get(`/bookings/${userId}`),

  // Get current/active bookings
  getCurrentBookings: (userId) => api.get(`/current-bookings/${userId}`),

  // Get upcoming bookings
  getUpcomingBookings: (userId) => api.get(`/upcoming-bookings/${userId}`),

  // Get past/history bookings  
  getPastBookings: (userId) => api.get(`/past-bookings/${userId}`),

  // Extend active booking
  extendBooking: (bookingId, extraHours) => 
    api.patch(`/bookings/${bookingId}/extend`, { extraHours }),

  // Edit booking date/time
  editBooking: (bookingId, updates) => 
    api.put(`/bookings/${bookingId}/edit`, updates),

  // Cancel booking
  cancelBooking: (bookingId) => 
    api.delete(`/bookings/${bookingId}`),

  // Refresh bookings (placeholder)
  refreshBookings: () => { /* refetch logic in hooks */ }
};

export default bookingService;
