const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  [
    body("name", "Product name is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("price", "Price must be a number").isNumeric(),
    body("category", "Category is required").notEmpty(),
    body("image", "Image URL is required").notEmpty(),
  ],
  productController.createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

module.exports = router;
