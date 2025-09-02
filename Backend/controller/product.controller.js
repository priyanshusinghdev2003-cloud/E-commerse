import asyncHandler from "../Utils/asynHandler.js";
import User from "../model/user.model.js";
import Store from "../model/store.model.js";
import Product from "../model/product.model.js";

// Get All Products
export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    message: "All products fetched successfully",
    products,
  });
});

// Get Single Product
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let product = await Product.findById(id).populate("store", "name");
  const relatedProducts = await Product.find({
    category: product.category,
  }).limit(5);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product = {
    ...product._doc,
    relatedProducts,
  };

  res.status(200).json({
    message: "Single product fetched successfully",
    product,
  });
});

// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category, images } = req.body;
  const user = req.user;

  const store = await Store.findById(user.store);
  if (!store) {
    return res.status(400).json({ message: "Store not found" });
  }
  console.log({ name, description, price, stock, category, images });

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    images: images || [],
    store: user.store,
  });

  if (product) {
    store.products.push(product._id);
    await store.save();
  }

  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, images } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.images = images || product.images;

  await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  await Store.findByIdAndUpdate(product.store, {
    $pull: { products: product._id },
  });

  res.status(200).json({
    message: "Product deleted successfully",
  });
});

// Get Products by Store
export const getProductByStore = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const products = await Product.find({ store: id });

  if (!products || products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found for this store" });
  }

  res.status(200).json({
    message: "Products fetched successfully",
    products,
  });
});

//get 4 random product
export const getRandomProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([{ $sample: { size: 4 } }]);
  res.status(200).json({
    message: "4 random products fetched successfully",
    products,
  });
});
