import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../Services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ AUTO LOGIN (restore from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log("Auto-login effect running", { storedUser: !!storedUser, token: !!token });

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("Auto-login: setting user", parsedUser);

      // ✅ optional auto redirect
      if (parsedUser.role === "user") navigate("/user/dashboard");
      else if (parsedUser.role === "admin") navigate("/admin/dashboard");
      else if (parsedUser.role === "super-admin")
        navigate("/super-admin/dashboard");
    }
  }, []);

// ✅ LOGIN
  const handleLogin = async (credentials) => {
    try {
      console.log("handleLogin called");

      const data = await authService.login(credentials);

      console.log("API Response:", data);

      // ✅ use backend user directly
      const userData = data.user;

      // store
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("role", userData.role);

      setUser(userData);
      setToken(data.accessToken);

      console.log("Redirecting...");

      // ✅ redirect using data.user.role
      if (userData.role === "user") navigate("/user/dashboard");
      else if (userData.role === "admin") navigate("/admin/dashboard");
      else if (userData.role === "super-admin")
        navigate("/super-admin/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    console.log("Logout called - clearing authentication data");
    localStorage.clear();
    setUser(null);
    setToken(null);
    console.log("State cleared - ProtectedRoute should handle redirect");
    // Don't navigate here - let ProtectedRoute handle the redirect when token becomes null
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
