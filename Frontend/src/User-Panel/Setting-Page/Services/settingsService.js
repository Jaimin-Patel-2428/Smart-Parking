import axios from "axios";

const BACKEND_API_URL = "http://localhost:5000/api";

const API = axios.create({
  baseURL: BACKEND_API_URL,
});

export const defaultSettings = {
  notifications: {
    bookingAlerts: true,
    expiryAlerts: true,
    paymentAlerts: true,
  },
  preferences: {
    defaultDuration: 60,
    preferredFloor: "",
  },
  reminders: {
    reminderEnabled: true,
    reminderTime: 10,
  },
  autoFeatures: {
    autoExtend: false,
    autoRelease: true,
  },
  appSettings: {
    darkMode: false,
    language: "en",
  },
};

const getStoredToken = () => localStorage.getItem("token") || localStorage.getItem("accessToken");

const clearStoredAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const toPlainSettings = (settings) => {
  if (!settings) {
    return {};
  }

  if (typeof settings.toObject === "function") {
    return settings.toObject();
  }

  return settings;
};

export const normalizeSettings = (settings) => {
  const plainSettings = toPlainSettings(settings);

  return {
    ...defaultSettings,
    ...plainSettings,
    notifications: {
      ...defaultSettings.notifications,
      ...(plainSettings.notifications || {}),
    },
    preferences: {
      ...defaultSettings.preferences,
      ...(plainSettings.preferences || {}),
    },
    reminders: {
      ...defaultSettings.reminders,
      ...(plainSettings.reminders || {}),
    },
    autoFeatures: {
      ...defaultSettings.autoFeatures,
      ...(plainSettings.autoFeatures || {}),
    },
    appSettings: {
      ...defaultSettings.appSettings,
      ...(plainSettings.appSettings || {}),
    },
  };
};

const handleError = (error) => {
  console.error(error);
  throw error.response?.data || { message: "Something went wrong" };
};

API.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(`${BACKEND_API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return API(originalRequest);
      } catch (err) {
        console.error("Refresh token failed");

        clearStoredAuth();

        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export const getSettings = async () => {
  try {
    const res = await API.get("/settings");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateSettings = async (data) => {
  try {
    const res = await API.patch("/settings", data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const sendDeleteOTP = async () => {
  try {
    const res = await API.post("/profile/send-delete-otp");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyDeleteOTP = async (otp) => {
  try {
    const res = await API.post("/profile/verify-delete-otp", { otp });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAccount = async () => {
  try {
    const res = await API.delete("/profile/delete-account");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
