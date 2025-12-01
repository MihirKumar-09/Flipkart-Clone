import express from "express";
const router = express.Router();
import User from "../models/userModel.js";
import passport from "passport";

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    res.json({
      success: true,
      user: {
        username: registeredUser.username,
        email: registeredUser.email,
        _id: registeredUser._id,
      },
    });
  } catch (err) {
    console.log("Failed to signup:", err);
    res.status(500).json({ success: false, error: "Signup failed" });
  }
});

// LOGIN ROUTE (ONLY ONE)
router.post("/login", (req, res, next) => {
  console.log("LOGIN HIT:", req.body);

  passport.authenticate("local", (err, user, info) => {
    console.log("AUTH CALLBACK:", { err, user, info });

    if (err)
      return res.status(500).json({ success: false, message: "Server error" });

    if (!user)
      return res.status(401).json({
        success: false,
        message: info?.message || "Invalid credentials",
      });

    req.logIn(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Login failed" });

      return res.json({
        success: true,
        user: { username: user.username, email: user.email, _id: user._id },
      });
    });
  })(req, res, next);
});

export default router;
