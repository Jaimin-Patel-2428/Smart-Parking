import { useState, useEffect } from "react";
import parkingService from "../Services/parkingService";

export const useBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!userId) return;
    try {
      const { data } = await parkingService.getUserBookings(userId);
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  return { bookings, loading, refresh: fetchBookings };
};
