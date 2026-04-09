const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },

    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "success",
    },

    description: {
      type: String,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);