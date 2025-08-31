const isAdminAuthenticate = async (req, res, next) => {
  try {
    const user = req.user;
    const isAdmin = user?.role === "admin";
    if (!isAdmin) {
      return res.status(403).json({ message: "You are not an admin" });
    }
    next();
  } catch (error) {
    console.error(`Error at authenticateAdmin: ${error}`);
    return res
      .status(500)
      .json({ message: "Server error during admin authentication" });
  }
};

export default isAdminAuthenticate;
