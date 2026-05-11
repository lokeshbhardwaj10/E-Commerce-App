const express = require("express");
const { body } = require("express-validator");
const orderController = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("products", "Products array is required").isArray(),
    body("shippingAddress.street", "Street is required").notEmpty(),
    body("shippingAddress.city", "City is required").notEmpty(),
    body("shippingAddress.state", "State is required").notEmpty(),
    body("shippingAddress.pincode", "Pincode is required").notEmpty(),
  ],
  orderController.createOrder
);

router.get("/myorders", authMiddleware, orderController.getMyOrders);

router.get("/", authMiddleware, adminMiddleware, orderController.getAllOrders);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  [body("status", "Status must be one of: pending, processing, shipped, delivered").optional().isIn(["pending", "processing", "shipped", "delivered"])],
  orderController.updateOrderStatus
);

module.exports = router;
