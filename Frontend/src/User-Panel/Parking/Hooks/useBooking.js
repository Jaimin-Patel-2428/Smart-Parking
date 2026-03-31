import { useState } from "react";
import bookingService from "../Services/bookingService";

export const useBooking = () => {
  const [isBooking, setIsBooking] = useState(false);

  const createBooking = async (details) => {
    setIsBooking(true);
    try {
      const response = await bookingService.confirm(details);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || "Booking failed";
    } finally {
      setIsBooking(false);
    }
  };

  return { createBooking, isBooking };
};
