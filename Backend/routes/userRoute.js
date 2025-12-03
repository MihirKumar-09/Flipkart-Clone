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
    // console.log("=".repeat(50));
    // console.log("LOGIN REQUEST RECEIVED");
    // console.log("Body:", req.body);
    // console.log("Session ID at start:", req.sessionID);
    // console.log("Session at start:", req.session);

    const { username, email, password } = req.body;

    // Validate input
    if (!password || (!username && !email)) {
      return res.status(400).json({
        success: false,
        error: "Username/Email and password are required",
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: username || "" }, { email: email || "" }],
    });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    console.log("User found:", user.username);

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    console.log("Password verified");

    // Set session data
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.email = user.email;

    console.log("Session data set:", {
      userId: req.session.userId,
      username: req.session.username,
    });

    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({
          success: false,
          error: "Session creation failed",
        });
      }

      // console.log("Session saved successfully");
      // console.log("Session after save:", req.session);
      // console.log("Session ID after save:", req.sessionID);

      res.json({
        success: true,
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
        sessionId: req.sessionID,
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
      details: error.message,
    });
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

// Profile Route to show profile;
router.get("/profile", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  try {
    const user = await User.findById(req.session.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch profile",
    });
  }
});

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

export default router;
