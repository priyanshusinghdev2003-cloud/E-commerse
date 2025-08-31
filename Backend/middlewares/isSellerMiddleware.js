const isSellerAuthenticate = async (req, res, next) => {
  try {
    const user = req.user;
    const isSeller = user?.role === "seller";
    if (!isSeller) {
      return res.status(403).json({ message: "You are not an seller" });
    }
    next();
  } catch (error) {
    console.error(`Error at authenticateSeller: ${error}`);
    return res
      .status(500)
      .json({ message: "Server error during seller authentication" });
  }
};

export default isSellerAuthenticate;
