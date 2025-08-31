import mongoose from "mongoose";
import { MONGO_URI } from "../Utils/constant.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error connecting mongoDb: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
