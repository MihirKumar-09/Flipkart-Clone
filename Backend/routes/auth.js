import express from "express";
import isAuth from "../middlewares/middleware.js";
const router = express.Router();
router.get("/auth/check", isAuth, (req, res) => {
  res.status(200).json({
    success: true,
    userId: req.session.userId,
  });
});
export default router;
