const Wallet = require("../models/Wallet");

const createWalletIfNotExists = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    wallet = await Wallet.create({ user: userId });
  }

  return wallet;
};

const getWalletByUser = async (userId) => {
  return await Wallet.findOne({ user: userId });
};



module.exports = {
  createWalletIfNotExists,
  getWalletByUser,
};
