import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Utils/constant.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error at authenticateUser: ${error}`);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
