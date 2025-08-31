import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  getProductByStore,
  updateProduct,
} from "../controller/product.controller.js";
import authenticateUser from "../middlewares/authMiddleware.js";

import isSellerAuthenticate from "../middlewares/isSellerMiddleware.js";
import allowRoles from "../middlewares/allowRoles.middleware.js";

const router = express.Router();

router.route("/").get(getAllProduct);
router.route("/:id").get(getSingleProduct);
router
  .route("/create")
  .post(authenticateUser, isSellerAuthenticate, createProduct);
router
  .route("/update/:id")
  .put(authenticateUser, allowRoles("seller", "admin"), updateProduct);
router
  .route("/delete/:id")
  .delete(authenticateUser, allowRoles("seller", "admin"), deleteProduct);
router
  .route("/store-products/:id")
  .get(authenticateUser, allowRoles("seller", "admin"), getProductByStore);

export default router;
