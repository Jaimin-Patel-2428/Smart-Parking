const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/", authMiddleware, transactionController.getTransactions);
router.post("/add-money", authMiddleware, transactionController.addMoney);
router.get("/total-revenue", authMiddleware, adminMiddleware, transactionController.getTotalRevenue);
router.get("/:id", authMiddleware, transactionController.getTransactionById);

module.exports = router;
