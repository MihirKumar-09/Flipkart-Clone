import express from "express";
import isAuth from "../middlewares/middleware.js";
const router = express.Router();
router.get("/check", isAuth, (req, res) => {
  res.status(200).json({
    user: {
      _id: req.session.userId,
      username: req.session.username,
    },
  });
});
export default router;
