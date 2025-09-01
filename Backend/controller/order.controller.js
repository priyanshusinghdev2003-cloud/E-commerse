import asyncHandler from "../Utils/asynHandler.js";
import User from "../model/user.model.js";
import Store from "../model/store.model.js";
import Product from "../model/product.model.js";
import Order from "../model/order.model.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { userId, products } = req.body;

  if (!userId || !products || products.length === 0) {
    return res.status(400).json({ message: "User and products required" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Group products by store
  const storeProductsMap = {};

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const storeId = product.store.toString();
    if (!storeProductsMap[storeId]) storeProductsMap[storeId] = [];

    storeProductsMap[storeId].push({
      product: product._id,
      quantity: item.quantity,
      price: product.price * item.quantity,
    });

    // reduce stock & increase sold
    product.stock -= item.quantity;
    product.sold += item.quantity;
    await product.save();
  }

  const createdOrders = [];

  // Create order for each store
  for (const [storeId, storeProducts] of Object.entries(storeProductsMap)) {
    const totalAmount = storeProducts.reduce((acc, p) => acc + p.price, 0);

    const order = await Order.create({
      user: user._id,
      store: storeId,
      products: storeProducts,
      totalAmount,
    });

    createdOrders.push(order);

    // update user & store
    await User.findByIdAndUpdate(user._id, { $push: { orders: order._id } });
    await Store.findByIdAndUpdate(storeId, {
      $push: { orders: order._id },
      $inc: { totalIncome: totalAmount },
    });
  }

  res.status(201).json({
    message: "Orders created successfully",
    orders: createdOrders,
  });
});

export const getOrdersByUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const orders = await Order.find({ user: user._id }).populate(
    "products.product"
  );
  if (!orders) return res.status(404).json({ message: "Orders not found" });
  res.status(200).json({ orders });
});

export const getOrdersBySeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ _id: id }).populate("products.product");
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({
    message: "Order status updated successfully",
    order,
  });
});
