import express from "express";
import isAuth from "../middlewares/middleware.js";
import User from "../models/userModel.js";
const router = express.Router();
router.get("/check", isAuth, async (req, res) => {
  const user = await User.findById(req.session.userId).select(
    "_id username email role",
  );

  if (!user) {
    return res.status(401).json({ success: false });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export default router;
