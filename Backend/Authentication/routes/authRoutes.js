const express = require("express");
const router = express.Router();

const authLimiter = require("../../middleware/rateLimiter");
const authMiddleware = require("../../middleware/authMiddleware");

const {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  refreshToken,
  forgotPassword,
  createAdmin
} = require("../controllers/authController");

router.post("/register", authLimiter, registerUser);

router.post("/verify-otp", verifyOTP);

router.post("/resend-otp", resendOTP);

router.post("/login", authLimiter, loginUser);

router.post("/refresh-token", refreshToken);

router.post("/forgot-password", forgotPassword);

router.post("/create-admin",authMiddleware, createAdmin);

module.exports = router;
