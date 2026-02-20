const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware"); // adjust path if needed

// Public routes
router.post("/", userController.createUser);      // Register
router.post("/login", userController.loginUser);  // Login

// Protected routes (any logged-in user)
router.put("/:id", protect, userController.updateUser);
router.get("/:id", protect, userController.getUserById);

// Admin-only routes
router.delete("/:id", protect, admin, userController.deleteUser);
router.get("/", protect, admin, userController.getAllUsers);

module.exports = router;
