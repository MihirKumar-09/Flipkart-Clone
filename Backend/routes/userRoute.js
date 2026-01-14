import express from "express";
const router = express.Router();
import User from "../models/userModel.js";

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body);

    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Enter correct email address",
      });
    }
    // Create new user (password will be hashed by pre-save hook)
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save user to database
    await newUser.save();

    console.log("User created successfully:", newUser.username);

    // Auto-login after signup
    req.session.userId = newUser._id;
    req.session.username = newUser.username;
    req.session.email = newUser.email;

    // Save session
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({
          success: false,
          error: "Session creation failed",
        });
      }

      res.status(201).json({
        success: true,
        message: "User created and logged in successfully",
        user: {
          username: newUser.username,
          email: newUser.email,
          _id: newUser._id,
        },
        sessionId: req.sessionID,
      });
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(", "),
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Signup failed",
      details: error.message,
    });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    // ✅ DECLARE FIRST
    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");

    // ✅ USE AFTER DECLARATION
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ SESSION SET AFTER USER EXISTS
    req.session.userId = user._id;
    req.session.username = user.username;

    req.session.save(() => {
      res.json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Check user log in or not ?
router.get("/check-login", (req, res) => {
  if (req.session.userId) {
    res.json({
      success: true,
      message: "User is logged in",
      user: {
        username: req.session.username,
        email: req.session.email,
        mobile: req.session.mobile,
        _id: req.session.userId,
      },
    });
  } else {
    res.json({
      success: false,
      message: "User is not logged in",
    });
  }
});

//! Profile Route to show profile;
// router.get("/profile", async (req, res) => {
//   if (!req.session.userId) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authenticated",
//     });
//   }

//   try {
//     const user = await User.findById(req.session.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch profile",
//     });
//   }
// });

// Logout Route
router.post("/logout", (req, res) => {
  console.log("Logout request received");

  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({
        success: false,
        error: "Logout failed",
      });
    }

    // Clear session cookie
    res.clearCookie("connect.sid");

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });
});

// Delete User
router.delete("/delete-user", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ success: false, error: "Not logged in" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, error: "Failed to clear session" });
      }

      res.clearCookie("connect.sid");
      return res.json({ success: true, message: "User deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete user" });
  }
});

// Update User
router.put("/user/update", async (req, res) => {
  try {
    const allowedFields = ["username", "email", "mobile"];

    const updates = {};
    for (let key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(req.session.userId, updates, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.mobile = user.mobile;
    res.json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update user" });
  }
});

export default router;
