const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").notEmpty(),
  ],
  authController.login
);

router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
