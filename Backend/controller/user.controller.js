import asyncHandler from "../Utils/asynHandler.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Utils/constant.js";
import Store from "../model/store.model.js";
import SellerApplication from "../model/sellerApplication.model.js";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";

const generateToken = (id) => {
  try {
    const token = jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log(`Error at creating token ${error}`);
    return null;
  }
};

// Register user controller
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

//  Login user controller
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.isPasswordMatch(password))) {
    const token = generateToken(user._id);
    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        message: "User Login Successfully",
        user,
      });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

//get loggedIn user detail
export const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found Please Login Again" });
  }
  const getUser = await User.findById(user._id).select("-password");

  res.status(200).json({
    message: "User Found Successfully",
    getUser,
  });
});

// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const { name, email, password } = req.body;

  // Check if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists && emailExists._id.toString() !== user._id.toString()) {
    return res.status(400).json({ message: "User already exists" });
  }
  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();
  console.log(updatedUser);

  res.status(200).json({
    message: "User Updated Successfully",
    updatedUser,
  });
});

// apply as seller

export const applyAsSeller = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const existApplication = await SellerApplication.findOne({ user: user._id });
  if (existApplication) {
    return res.status(400).json({ message: "Application already exists" });
  }
  const application = await SellerApplication.create({
    user: user._id,
  });
  res.status(200).json({
    message: "Application sended Successfully",
    application,
  });
});

export const setApplicationStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  console.log(user);
  const { status } = req.body;
  const sellerApplication = await SellerApplication.findOne({ user: user._id });
  if (status == "Rejected") {
    sellerApplication.status = status;
    await sellerApplication.save();
    const store = await Store.findOne({ owner: user._id });
    if (store) {
      await store.deleteOne();
    }
    return res.status(200).json({
      message: "Application status updated Successfully",
    });
  }
  sellerApplication.status = "Approved";
  await sellerApplication.save();
  if (user.role !== "admin") {
    user.role = "seller";
  }
  await user.save();

  res.status(200).json({
    message: "Application status updated Successfully",
  });
});

export const getApplicationStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  const application = await SellerApplication.findOne({ user: id });
  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  if (user.role !== "admin" && user._id.toString() !== id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to view this application" });
  }

  res.status(200).json({
    message: "Application found successfully",
    application,
  });
});

export const storeCreation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const { name, description } = req.body;
  const existStore = await Store.findOne({ owner: user._id });
  if (existStore) {
    return res.status(400).json({ message: "Store already exists" });
  }
  const store = await Store.create({
    name,
    description,
    owner: user._id,
  });
  user.store = store._id;
  await user.save();
  res.status(200).json({
    message: "Store Created Successfully",
    store,
  });
});
