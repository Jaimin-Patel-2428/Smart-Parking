const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateOTP = require("../../utils/generateOTP");
const hashOTP = require("../../utils/hashOTP");
const sendOTP = require("../../utils/sendOTP");
const detectRole = require("../../utils/detectRole");
const generateTokens = require("../../utils/generateTokens");
const generateUserId = require("../../utils/generateUserId");
// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, mobile, vehicleNumber, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);
    const role = detectRole(email);

    user = new User({
      fullName,
      email,
      mobile,
      vehicleNumber,
      password: password,
      role,
      otpHash,
      otpExpire: Date.now() + 5 * 60 * 1000,
    });

    await user.save();

    try {
      await sendOTP(email, otp, fullName);
    } catch (error) {
      console.log("Email sending failed:", error.message);
    }

    return res.status(200).json({
      message: "OTP sent to email",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // ✅ VERY IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

// Verify OTP

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const hashedOTP = hashOTP(otp);

  if (user.otpHash !== hashedOTP)
    return res.status(400).json({ message: "Invalid OTP" });

  if (user.otpExpire < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  user.isVerified = true;

  user.userId = await generateUserId();

  user.otpHash = null;

  await user.save();

  res.json({ message: "Registration complete" });
};

// Resend OTP

exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();

  user.otpHash = hashOTP(otp);

  user.otpExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendOTP(email, otp, user.fullName);

  res.json({ message: "OTP resent" });
};

// Login

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Check OTP verification
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    // ✅ Check if blocked
    if (user.status === "inactive") {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    const match = await user.matchPassword(password);

    if (!match) return res.status(400).json({ message: "Invalid password" });

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,

      // ✅ ADD THIS
      user: {
        _id: user._id,
        name: user.fullName, // ⚠️ you used fullName
        email: user.email,
        role: user.role,
        vehicleNumber: user.vehicleNumber,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Refresh Token

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Token missing" });

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.id);

  const tokens = generateTokens(user);

  res.json(tokens);
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = generateOTP();

  user.otpHash = hashOTP(otp);

  user.otpExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendOTP(email, otp, user.fullName);

  res.json({ message: "Password reset OTP sent" });
};

//Admin

exports.createAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      fullName,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
      createdBy: req.user.id,
    });

    await admin.save();

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
