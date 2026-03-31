import { useState, useEffect } from "react";
import parkingService from "../Services/parkingService";
import axios from "axios";

export const useParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParkings = async () => {
    try {
      const { data } = await parkingService.getAllParkings();
      setParkings(data);
    } catch (err) {
      console.error("Failed to fetch parkings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  return { parkings, loading, refresh: fetchParkings };
};
