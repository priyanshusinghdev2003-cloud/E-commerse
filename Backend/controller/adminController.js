import asyncHandler from "../Utils/asynHandler.js";
import User from "../model/user.model.js";
import Store from "../model/store.model.js";
import SellerApplication from "../model/sellerApplication.model.js";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";

// ✅ Admin Dashboard Summary
export const getAdminSummary = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStores = await Store.countDocuments();
  const pendingApplications = await SellerApplication.countDocuments({
    status: "pending",
  });
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, revenue: { $sum: "$totalAmount" } } },
  ]);

  res.status(200).json({
    message: "Admin dashboard summary",
    stats: {
      totalUsers,
      totalStores,
      pendingApplications,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.revenue || 0,
    },
  });
});

// ✅ Paginated Users
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const users = await User.find()
    .select("name email role createdAt")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  res.status(200).json({
    message: "Users fetched successfully",
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    users,
  });
});

// ✅ Paginated Stores
export const getAllStores = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const stores = await Store.find()
    .populate("owner", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Store.countDocuments();

  res.status(200).json({
    message: "Stores fetched successfully",
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    stores,
  });
});

// ✅ Seller Applications (Paginated + Filtered)
export const getSellerApplications = asyncHandler(async (req, res) => {
  const { status = "pending", page = 1, limit = 20 } = req.query;

  const applications = await SellerApplication.find({ status })
    .populate("user", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await SellerApplication.countDocuments({ status });

  res.status(200).json({
    message: "Applications fetched successfully",
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    applications,
  });
});

// ✅ Paginated Products
export const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const products = await Product.find()
    .populate("store", "name")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments();

  res.status(200).json({
    message: "Products fetched successfully",
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    products,
  });
});

// ✅ Paginated Orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Order.countDocuments();

  res.status(200).json({
    message: "Orders fetched successfully",
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    orders,
  });
});

// get user as seller
export const getUserAsSeller = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "seller" });
  res.status(200).json({
    users,
  });
});

//get user as normal user
export const getUserAsNormalUser = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({
    users,
  });
});

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user.role == "seller") {
    const store = await Store.findByIdAndDelete({
      owner: user._id,
    });
    const products = await Product.find({ store: store._id });
    await Product.deleteMany({ store: store._id });
  }
  res.status(200).json({
    message: "User deleted successfully",
  });
});
