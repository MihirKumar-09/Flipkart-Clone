import express from "express";
const router = express.Router();
import Address from "../models/addressModel.js";

router.post("/address", async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.session.userId,
    });

    res.json({
      success: true,
      address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
export default router;
