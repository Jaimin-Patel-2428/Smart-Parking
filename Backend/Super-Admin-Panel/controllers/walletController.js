const walletService = require("../services/walletService");
const Transaction = require("../models/Transaction");
const User = require("../../Authentication/models/User");
const Wallet = require("../models/Wallet");

const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await walletService.getWalletByUser(userId);

    res.json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: ALL USERS WALLET =================

const getAllUserWallets = async (req, res) => {
  try {
    // 🔐 Only super admin

    const wallets = await Wallet.find()
      .populate("user", "fullName email")
      .sort({ balance: -1 });

    res.json({
      success: true,
      totalUsers: wallets.length,
      data: wallets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: DASHBOARD SUMMARY =================

const getWalletSummary = async (req, res) => {
  try {
    // 🔐 Only super admin

    // 💰 Total Revenue (debit)
    const revenueResult = await Transaction.aggregate([
      { $match: { type: "debit", status: "success" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // 🔁 Total Refunds (credit with booking)
    const refundResult = await Transaction.aggregate([
      {
        $match: {
          type: "credit",
          booking: { $ne: null },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // 👥 Total Users
    const totalUsers = await User.countDocuments();

    // 💳 Total Transactions
    const totalTransactions = await Transaction.countDocuments();

    res.json({
      success: true,
      data: {
        totalRevenue: revenueResult[0]?.total || 0,
        totalRefunds: refundResult[0]?.total || 0,
        totalUsers,
        totalTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: REVENUE ANALYTICS =================
const getRevenueAnalytics = async (req, res) => {
  try {
    const { type = "daily" } = req.query;

    let groupFormat;

    if (type === "monthly") {
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      };
    } else {
      // default daily
      groupFormat = {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
      };
    }

    const revenue = await Transaction.aggregate([
      {
        $match: {
          type: "debit",
          status: "success",
        },
      },
      {
        $group: {
          _id: groupFormat,
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);

    res.json({
      success: true,
      type,
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: TOP USERS =================
const getTopUsers = async (req, res) => {
  try {
    const topUsers = await Transaction.aggregate([
      {
        $match: {
          type: "debit",
          status: "success",
        },
      },
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalSpent: -1 },
      },
      {
        $limit: 5, // top 5 users
      },
      {
        $lookup: {
          from: "users", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          fullName: "$user.fullName",
          email: "$user.email",
          totalSpent: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: topUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: PARKING REVENUE =================
const getParkingRevenue = async (req, res) => {
  try {
    const revenue = await Transaction.aggregate([
      {
        $match: {
          type: "debit",
          status: "success",
          booking: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "bookings", // booking collection
          localField: "booking",
          foreignField: "_id",
          as: "booking",
        },
      },
      {
        $unwind: "$booking",
      },
      {
        $lookup: {
          from: "parkings", // parking collection
          localField: "booking.parking",
          foreignField: "_id",
          as: "parking",
        },
      },
      {
        $unwind: "$parking",
      },
      {
        $group: {
          _id: "$parking._id",
          parkingName: { $first: "$parking.name" },
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
    ]);

    res.json({
      success: true,
      data: revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: REFUND TRACKING =================
const getRefundStats = async (req, res) => {
  try {
    const refunds = await Transaction.aggregate([
      {
        $match: {
          type: "credit",
          booking: { $ne: null }, // only booking refunds
        },
      },
      {
        $group: {
          _id: null,
          totalRefundAmount: { $sum: "$amount" },
          totalRefunds: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalRefundAmount: refunds[0]?.totalRefundAmount || 0,
        totalRefunds: refunds[0]?.totalRefunds || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADMIN: FAILED TRANSACTIONS =================
const getFailedTransactions = async (req, res) => {
  try {
    const failedTransactions = await Transaction.find({
      status: "failed",
    })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: failedTransactions.length,
      data: failedTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWallet,
  getAllUserWallets,
  getWalletSummary,
  getRevenueAnalytics,
  getTopUsers,
  getParkingRevenue,
  getRefundStats,
  getFailedTransactions,
};
