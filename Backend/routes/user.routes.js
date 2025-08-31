import express from "express";
import {
  applyAsSeller,
  getApplicationStatus,
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  setApplicationStatus,
  storeCreation,
  updateUser,
} from "../controller/user.controller.js";
import authenticateUser from "../middlewares/authMiddleware.js";
import isAdminAuthenticate from "../middlewares/isAdminMiddleware.js";
import isSellerAuthenticate from "../middlewares/isSellerMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authenticateUser, logoutUser);

router
  .route("/profile")
  .get(authenticateUser, getLoggedInUser)
  .put(authenticateUser, updateUser);

router.route("/apply-as-seller").post(authenticateUser, applyAsSeller);
router
  .route("/update-seller-status/:id")
  .put(authenticateUser, isAdminAuthenticate, setApplicationStatus);

router
  .route("/create-user-store")
  .post(authenticateUser, isSellerAuthenticate, storeCreation);

router
  .route("/get-application/:id")
  .get(authenticateUser, getApplicationStatus);
export default router;
