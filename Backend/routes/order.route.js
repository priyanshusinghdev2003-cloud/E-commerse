import express from "express";
import { createOrder } from "../controller/order.controller.js";
import authenticateUser from "../middlewares/authMiddleware.js";

import isSellerAuthenticate from "../middlewares/isSellerMiddleware.js";
import allowRoles from "../middlewares/allowRoles.middleware.js";

const router = express.Router();

router.route("/create-order").post(authenticateUser, createOrder);

export default router;
