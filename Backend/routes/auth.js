import express from "express";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

// Check normal ;
router.get("/check", isAuth, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default router;
