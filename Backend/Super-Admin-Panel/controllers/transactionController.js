const Transaction = require("../models/Transaction");
const transactionService = require("../services/transactionService");
const {
  sendNotification,
} = require("../../Shared/services/notification.service");

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      status,
      startDate,
      endDate,
      userId,
    } = req.query;

    const query = {};

    // 👤 Role-based access
    if (req.user.role !== "super-admin") {
      query.user = req.user.id; // normal user → only own data
    }

    // 🔍 Filters
    if (type) query.type = type;
    if (status) query.status = status;
    if (userId) query.user = userId;

    // 📅 Date filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query)
      .populate("user", "fullName email")
      .populate("booking")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Money
const addMoney = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    const result = await transactionService.addMoney(userId, amount);

    void sendNotification({
      user: userId,
      type: "wallet",
      title: "Wallet top-up successful",
      message: `Your wallet has been credited with ${Number(amount)}.`,
      entityType: "wallet",
      entityId: result.transaction?._id,
      metadata: {
        amount: Number(amount),
        balance: result.wallet?.balance,
      },
    }).catch((notificationError) => {
      console.error("Transaction notification error:", notificationError);
    });

    res.json({
      success: true,
      message: "Money added successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ================= ADMIN: TOTAL REVENUE =================
const getTotalRevenue = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { type: "debit", status: "success" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      success: true,
      totalRevenue: result[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= TRANSACTION DETAILS =================
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id)
      .populate("user", "fullName email")
      .populate({
        path: "booking",
        populate: {
          path: "parking",
          select: "name location",
        },
      });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addMoney,
  getTotalRevenue,
  getTransactionById,
};
