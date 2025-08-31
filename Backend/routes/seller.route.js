import express from "express";
import {
  getAllOrdersBySeller,
  getAllSellerProducts,
  getSellerSummary,
} from "../controller/sellerController.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import isAdminAuthenticate from "../middlewares/isAdminMiddleware.js";
import isSellerAuthenticate from "../middlewares/isSellerMiddleware.js";
import allowRoles from "../middlewares/allowRoles.middleware.js";

const router = express.Router();
