import { useState, useEffect } from "react";
import slotService from "../Services/slotService";

export const useSlots = (parkingId) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const { data } = await slotService.getSlotsByParking(parkingId);
      setSlots(data.slots);
    } catch (err) {
      console.error("Error fetching slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (parkingId) fetchSlots();
  }, [parkingId]);

  return { slots, loading, refresh: fetchSlots };
};
