import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import bookingService from "../Services/bookingService";

export const useMyBookings = () => {
  const { user, token, logout } = useAuth();
  const userId = user?._id;
  const isAuthenticated = !!token;

  // States
  const [currentBookings, setCurrentBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [extending, setExtending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current
  const fetchCurrent = useCallback(async () => {
    if (!userId) return;
    setLoadingCurrent(true);
    setError(null);
    try {
      const { data } = await bookingService.getCurrentBookings(userId);
      setCurrentBookings(data);
    } catch (err) {
      console.error("Current fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch current bookings");
    } finally {
      setLoadingCurrent(false);
    }
  }, [userId]);

  // Fetch upcoming
  const fetchUpcoming = useCallback(async () => {
    if (!userId) return;
    setLoadingUpcoming(true);
    setError(null);
    try {
      const { data } = await bookingService.getUpcomingBookings(userId);
      setUpcomingBookings(data);
    } catch (err) {
      console.error("Upcoming fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch upcoming");
    } finally {
      setLoadingUpcoming(false);
    }
  }, [userId]);

  // Fetch history (past)
  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    setLoadingHistory(true);
    setError(null);
    try {
      const { data } = await bookingService.getPastBookings(userId);
      setHistoryBookings(data);
    } catch (err) {
      console.error("History fetch error:", err);
      setError(err.response?.data?.message || "Failed to fetch history");
    } finally {
      setLoadingHistory(false);
    }
  }, [userId]);

// Extend booking
  const extendBooking = async (bookingId, extraHours) => {
    if (!userId) return;
    setExtending(true);
    try {
      const { data } = await bookingService.extendBooking(bookingId, extraHours);
      
      // Optimistic update all tabs
      setCurrentBookings(prev => 
        prev.map(b => b._id === bookingId ? data.booking : b)
      );
      setUpcomingBookings(prev => 
        prev.map(b => b._id === bookingId ? data.booking : b)
      );
      setHistoryBookings(prev => 
        prev.map(b => b._id === bookingId ? data.booking : b)
      );
      
      console.log(`Extended by ${extraHours} hours!`);
      return data.booking;
    } catch (err) {
      console.error("Extend error:", err);
      throw err;
    } finally {
      setExtending(false);
    }
  };

  // Edit booking
  const editBooking = async (bookingId, updates) => {
    if (!userId) return;
    try {
      const { data } = await bookingService.editBooking(bookingId, updates);
      
      // Update across all tabs
      const updateTab = (prev) => prev.map(b => b._id === bookingId ? data.booking : b);
      setCurrentBookings(updateTab);
      setUpcomingBookings(updateTab);
      setHistoryBookings(updateTab);
      
      console.log('Booking edited successfully');
      return data.booking;
    } catch (err) {
      console.error("Edit error:", err);
      throw err;
    }
  };

  // Cancel booking
  const cancelBooking = async (bookingId) => {
    if (!userId || !isAuthenticated) {
      alert("Please login to cancel booking");
      return;
    }
    
    try {
      console.log('🔑 Token before cancel:', token ? `${token.substring(0,20)}...` : 'NO TOKEN');
      console.log('🚗 Booking ID:', bookingId);
      
      const { data } = await bookingService.cancelBooking(bookingId);
      
      // Remove from all tabs
      const filterTab = (prev) => prev.filter(b => b._id !== bookingId);
      setCurrentBookings(filterTab);
      setUpcomingBookings(filterTab);
      setHistoryBookings(filterTab);
      
      console.log('✅ Booking cancelled');
      return data;
    } catch (err) {
      console.error('❌ Cancel ERROR details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        fullError: err.message
      });
      console.error("Cancel error:", err);
      
      // Handle 401 Unauthorized - session expired
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        logout();
        return;
      }
      
      // Other errors
      const errorMsg = err.response?.data?.message || "Failed to cancel booking";
      alert(errorMsg);
      throw err;
    }
  };

  // Initial load
  useEffect(() => {
    if (userId) {
      fetchCurrent();
      fetchUpcoming();
      fetchHistory();
    }
  }, [userId, fetchCurrent, fetchUpcoming, fetchHistory]);

  return {
    currentBookings,
    upcomingBookings,
    historyBookings,
    loadingCurrent,
    loadingUpcoming,
    loadingHistory,
    extending,
    error,
    fetchCurrent,
    fetchUpcoming,
    fetchHistory,
    extendBooking,
    editBooking,
    cancelBooking
  };
};

