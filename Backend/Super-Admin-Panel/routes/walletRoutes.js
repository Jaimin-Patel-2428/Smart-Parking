const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/", authMiddleware, walletController.getWallet);
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  walletController.getAllUserWallets,
);
router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  walletController.getWalletSummary,
);
router.get(
  "/revenue",
  authMiddleware,
  adminMiddleware,
  walletController.getRevenueAnalytics,
);
router.get(
  "/top-users",
  authMiddleware,
  adminMiddleware,
  walletController.getTopUsers,
);
router.get(
  "/parking-revenue",
  authMiddleware,
  adminMiddleware,
  walletController.getParkingRevenue,
);
router.get(
  "/refund-stats",
  authMiddleware,
  adminMiddleware,
  walletController.getRefundStats,
);
router.get(
  "/failed-transactions",
  authMiddleware,
  adminMiddleware,
  walletController.getFailedTransactions,
);

module.exports = router;
