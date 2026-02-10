import User from "../models/userModel.js";

const isAuth = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ success: false });
    }

    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ success: false });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("isAuth error:", err);
    return res.status(500).json({ success: false });
  }
};

export default isAuth;
