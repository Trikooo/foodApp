const router = require("express").Router();
const isAdmin = require("../middlewares/auth").isAdmin;
const uploadMiddleware = require("../middlewares/uploads");
const { checkSchema } = require("express-validator");
const productValidationSchema = require("../utils/validationSchemas");
const validateImages = require("../middlewares/imageValidation");
const productController = require("../controllers/products.controller.js");


// get all products
router.get("/api/products", productController.getAllProducts);

// get product by id
router.get("/api/products/:id", productController.getProductById);

// create product
router.post(
  "/api/products/create",
  uploadMiddleware,
  validateImages,
  checkSchema(productValidationSchema),
  productController.createProduct
);

// fully update existing product
router.put(
  "/api/products/:id",
  uploadMiddleware,
  validateImages,
  checkSchema(productValidationSchema),
  productController.updateProduct
);

// partially update existing product
router.patch("/api/products/:id", productController.partiallyUpdateProduct);

// delete product
router.delete("/api/products/:id", productController.deleteProduct);


module.exports = router;
