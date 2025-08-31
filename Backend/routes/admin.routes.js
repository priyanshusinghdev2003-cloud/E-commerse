import express from "express";
import {
  getAdminSummary,
  getAllOrders,
  getAllStores,
  getAllProducts,
  getAllUsers,
  getSellerApplications,
  getUserAsNormalUser,
  getUserAsSeller,
  deleteUser,
} from "../controller/adminController.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import isAdminAuthenticate from "../middlewares/isAdminMiddleware.js";

const router = express.Router();

router
  .route("/summary")
  .get(authenticateUser, isAdminAuthenticate, getAdminSummary);
router
  .route("/orders")
  .get(authenticateUser, isAdminAuthenticate, getAllOrders);
router
  .route("/stores")
  .get(authenticateUser, isAdminAuthenticate, getAllStores);
router
  .route("/products")
  .get(authenticateUser, isAdminAuthenticate, getAllProducts);
router.route("/users").get(authenticateUser, isAdminAuthenticate, getAllUsers);
router
  .route("/sellers")
  .get(authenticateUser, isAdminAuthenticate, getUserAsSeller);

router
  .route("/normalUsers")
  .get(authenticateUser, isAdminAuthenticate, getUserAsNormalUser);
router
  .route("/applications")
  .get(authenticateUser, isAdminAuthenticate, getSellerApplications);

router
  .route("/delete/:id")
  .delete(authenticateUser, isAdminAuthenticate, deleteUser);

export default router;
