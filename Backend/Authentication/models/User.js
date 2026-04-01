const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    mobile: {
      type: String,
    },

    address: {
      type: String,
      trim: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true, // ✅ better for consistency
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // OTP
    otpHash: String,
    otpExpire: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,

    totalBookings: {
      type: Number,
      default: 0,
    },

    userId: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// 🔑 Compare password (used in login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
