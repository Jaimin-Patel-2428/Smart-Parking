require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Super Admin Routes
const parkingRoutes = require("./Super-Admin-Panel/routes/parkingRoutes");
const dashboardRoutes = require("./Super-Admin-Panel/routes/dashboardRoutes");
const slotRoutes = require("./Super-Admin-Panel/routes/slotRoutes");
const bookingRoutes = require("./Super-Admin-Panel/routes/bookingRoutes");
const userRoutes = require("./Super-Admin-Panel/routes/userRoutes");

// Authentication
const authRoutes = require("./Authentication/routes/authRoutes");
const createSuperAdmin = require("./utils/createSuperAdmin");

// User Routes
const userParkingRoutes = require("./User-Panel/routes/parkingRoutes");
const profileRoutes = require("./User-Panel/routes/profileRoutes");

const app = express();

// Connect to Database
connectDB().then(()=>{
  createSuperAdmin();
});

// Middleware
app.use(cors());
app.use(express.json());

// Super Admin Routes (existing)
app.use("/super-admin/dashboard", dashboardRoutes);
app.use("/api/super-admin/parking", parkingRoutes);
app.use("/api/super-admin/slots", slotRoutes);
app.use("/api/super-admin/bookings", bookingRoutes);
app.use("/api/super-admin/users", userRoutes);

// Super Admin shorthand routes used by frontend
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/parking", parkingRoutes);
app.use("/api/admin/slots", slotRoutes);
app.use("/api/admin/bookings", bookingRoutes);
app.use("/api/admin/users", userRoutes);

// Authentication Routes
app.use("/api/auth", authRoutes);

// User Routes
app.use("/api", userParkingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/profile", profileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
