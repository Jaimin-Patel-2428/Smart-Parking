import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

// Add interceptors here if you need to add Auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log('📤 API Request Headers - Token:', token ? token.substring(0,20) + '...' : 'NO TOKEN');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
