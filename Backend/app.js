import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/user.routes.js";
import ProductRoute from "./routes/product.route.js";
import adminRoute from "./routes/admin.routes.js";
import orderRoute from "./routes/order.route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json("Server is running");
});

app.use("/api/auth", authRoute);
app.use("/api/product", ProductRoute);
app.use("/api/admin", adminRoute);
app.use("/api/order", orderRoute);

export default app;
