import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

import User from "./models/userModel.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoute.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/adminRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import alertRoute from "./routes/alertRoute.js";

//! Send email alerts;
// import { sendEmail } from "./utils/sendEmail.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// --------------------
// BASIC MIDDLEWARE
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "https://flipkart-clone-1-eay9.onrender.com/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.set("trust proxy", 1);

// --------------------
// SESSION CONFIGURATION
// --------------------
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 7 * 24 * 60 * 60, // 7 days
      autoRemove: "native",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }),
);

// Debug middleware
app.use((req, res, next) => {
  // console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  // console.log(`Session ID: ${req.sessionID}`);
  // console.log(`User authenticated: ${req.session.userId ? "YES" : "NO"}`);
  // console.log("-".repeat(50));
  next();
});

// --------------------
// CUSTOM AUTH MIDDLEWARE
// --------------------

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
};

// Get current user from session
const getCurrentUser = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).select("-password");
      req.user = user;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  next();
};

app.use(getCurrentUser);

// --------------------
// ROUTES
// --------------------
app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    timestamp: new Date().toISOString(),
  });
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

//! ===========ALERT===========
// app.get("/test-email", async (req, res) => {
//   try {
//     await sendEmail(
//       "yourpersonalemail@gmail.com",
//       "Test Email",
//       "<h1>Email working</h1>",
//     );

//     res.json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Email failed" });
//   }
// });

// Mount routes
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", addressRoutes);
app.use("/order", orderRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api", reviewRoute);
app.use("/api", alertRoute);

// 404 handler which handle wrong route request;
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  const statusCode = err.statusCode || 500;

  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Internal server error";

  const response = {
    success: false,
    error: message,
  };
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
});

// --------------------
// DATABASE CONNECTION & SERVER START
// --------------------
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
};

startServer();

export { isAuthenticated };
