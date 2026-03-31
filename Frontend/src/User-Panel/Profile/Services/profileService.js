import api from "../../../Shared/Services/api";

const API_BASE = "/profile";

export const profileService = {
  // Get profile + vehicles
  getProfile: () => api.get(API_BASE),

  // Update profile details
  updateProfile: (data) => api.patch(API_BASE, data),

  // Vehicles
  addVehicle: (data) => api.post(`${API_BASE}/vehicles`, data),
  updateVehicle: (id, data) => api.patch(`${API_BASE}/vehicles/${id}`, data),
  deleteVehicle: (id) => api.delete(`${API_BASE}/vehicles/${id}`),

  // Get single vehicle by ID (optional)
  getVehicle: (id) => api.get(`${API_BASE}/vehicles/${id}`)
};

export default profileService;
