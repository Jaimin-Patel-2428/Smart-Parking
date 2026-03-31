import axios from "axios";
const API_URL = "http://localhost:5000/api";

const slotService = {
  // Lock slot for 5 minutes (Backend: parkingController.lockSlot)
  lockSlot: (slotId) => axios.post(`${API_URL}/slot/lock`, { slotId }),

  // Get all slots for a specific parking (Backend: parkingController.getParkingDetails)
  getSlotsByParking: (parkingId) =>
    axios.get(`${API_URL}/parking/${parkingId}`),
};

export default slotService;
