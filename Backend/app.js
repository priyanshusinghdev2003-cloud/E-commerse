import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json("Server is running");
});

export default app;
