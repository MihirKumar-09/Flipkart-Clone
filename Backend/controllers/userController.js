import User from "../models/userModel.js";

// ===========SING-UP ROUTE==========
export const signup = async (req, res, next) => {
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
    next(err);
  }
};

// ========SING-IN ROUTE=========
export const signin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!password || (!username && !email))
      return res.status(400).json({ error: "Missing credentials" });

    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    req.session.userId = user._id;
    req.session.username = user.username;

    // await session save before sending response
    await new Promise((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ========LOG-OUT========
export const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("connect.sid");
      res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
    });
  } catch (err) {
    next(err);
  }
};

// ========DELETE USER========
export const deleteUser = async (req, res, next) => {
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
      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    });
  } catch (err) {
    next(err);
  }
};

// =========UPDATE USER========;
export const updateUser = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
};
