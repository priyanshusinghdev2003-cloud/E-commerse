import asyncHandler from "../Utils/asynHandler.js";
import Store from "../model/store.model.js";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";

// ✅ Seller Dashboard Summary
export const getSellerSummary = asyncHandler(async (req, res) => {
  const store = await Store.findOne({ owner: req.user._id });
  if (!store) {
    return res.status(404).json({ message: "Store not found" });
  }

  const totalProducts = await Product.countDocuments({ store: store._id });
  const totalOrders = await Order.countDocuments({ store: store._id });
  const totalRevenue = store.totalIncome || 0;

  res.status(200).json({
    message: "Seller dashboard summary",
    stats: {
      totalProducts,
      totalOrders,
      totalRevenue,
    },
  });
});

// ✅ Seller Products
export const getAllSellerProducts = asyncHandler(async (req, res) => {
  const store = await Store.findOne({ owner: req.user._id }).populate(
    "products",
    "name description price stock"
  );

  if (!store) {
    return res.status(404).json({ message: "Store not found" });
  }

  res.status(200).json({
    message: "Products fetched successfully",
    products: store.products,
  });
});

// ✅ Seller Orders
export const getAllOrdersBySeller = asyncHandler(async (req, res) => {
  const store = await Store.findOne({ owner: req.user._id }).populate({
    path: "orders",
    populate: [
      { path: "user", select: "name email" },
      { path: "items.product", select: "name price" },
    ],
  });

  if (!store) {
    return res.status(404).json({ message: "Store not found" });
  }

  res.status(200).json({
    message: "Orders fetched successfully",
    orders: store.orders,
  });
});
