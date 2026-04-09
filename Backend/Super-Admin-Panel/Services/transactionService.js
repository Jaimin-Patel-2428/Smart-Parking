const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { createWalletIfNotExists } = require("./walletService");

// Add Money
const addMoney = async (userId, amount) => {
  const wallet = await createWalletIfNotExists(userId);

  wallet.balance += amount;
  await wallet.save();

  const transaction = await Transaction.create({
    user: userId,
    wallet: wallet._id,
    type: "credit",
    amount,
    description: "Wallet Top-up",
  });

  return { wallet, transaction };
};

// Deduct Money (Booking)
const deductMoney = async (userId, amount, bookingId) => {
  const wallet = await createWalletIfNotExists(userId);

  if (wallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  wallet.balance -= amount;
  await wallet.save();

  const transaction = await Transaction.create({
    user: userId,
    wallet: wallet._id,
    type: "debit",
    amount,
    booking: bookingId,
    description: "Parking Booking Payment",
  });

  return { wallet, transaction };
};

// Refund
const refundMoney = async (userId, amount, bookingId) => {
  const wallet = await createWalletIfNotExists(userId);

  wallet.balance += amount;
  await wallet.save();

  const transaction = await Transaction.create({
    user: userId,
    wallet: wallet._id,
    type: "credit",
    amount,
    booking: bookingId,
    description: "Booking Refund",
  });

  return { wallet, transaction };
};

module.exports = {
  addMoney,
  deductMoney,
  refundMoney,
};
