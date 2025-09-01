import express from "express";
import {
  createOrder,
  getOrdersBySeller,
  getOrdersByUser,
  updateOrderStatus,
} from "../controller/order.controller.js";
import authenticateUser from "../middlewares/authMiddleware.js";

import isSellerAuthenticate from "../middlewares/isSellerMiddleware.js";
import allowRoles from "../middlewares/allowRoles.middleware.js";

const router = express.Router();

router.route("/create-order").post(authenticateUser, createOrder);
router
  .route("/order-detail-seller/:id")
  .get(authenticateUser, isSellerAuthenticate, getOrdersBySeller);
router.route("/order-detail").get(authenticateUser, getOrdersByUser);
router
  .route("/update-order-status/:id")
  .post(authenticateUser, isSellerAuthenticate, updateOrderStatus);

export default router;
