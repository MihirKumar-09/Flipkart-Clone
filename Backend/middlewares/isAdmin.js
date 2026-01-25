// Create middleware to check the user role, It mean the user is normal user or admin;
import User from "../models/userModel.js";
const isAdmin = async (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: "Login Required" });
  }

  const user = await User.findById(req.session.userId).select("role");

  if (!user || user.role != "ADMIN") {
    return res.status(403).json({ message: "ADMIN access only" });
  }
  next();
};
export default isAdmin;
