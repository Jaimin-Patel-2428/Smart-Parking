const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../../middleware/authMiddleware");

/*
========================================
  PROFILE ROUTES - User Profile & Vehicles
========================================
*/

// Get complete profile + vehicles
router.get("/", authMiddleware, profileController.getProfile);

// Update profile details
router.patch("/", authMiddleware, profileController.updateProfile);

// Vehicles CRUD
router.post("/vehicles", authMiddleware, profileController.addVehicle);
router.patch("/vehicles/:id", authMiddleware, profileController.updateVehicle);
router.delete("/vehicles/:id", authMiddleware, profileController.deleteVehicle);

module.exports = router;
