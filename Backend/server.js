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

dotenv.config();

const app = express();

/* ⭐ IMPORTANT FIX FOR RENDER */
const PORT = process.env.PORT || 8080;

// --------------------
// BASIC MIDDLEWARE
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// CORS CONFIGURATION
// --------------------
const corsOptions = {
  /* ⭐ FIXED: removed trailing "/" */
  origin: "https://flipkart-clone-1-eay9.onrender.com",
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
      ttl: 7 * 24 * 60 * 60,
      autoRemove: "native",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

// --------------------
// DEBUG MIDDLEWARE
// --------------------
app.use((req, res, next) => {
  next();
});

// --------------------
// AUTH MIDDLEWARE
// --------------------
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

// Route mounting
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", addressRoutes);
app.use("/order", orderRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api", reviewRoute);
app.use("/api", alertRoute);

// --------------------
// 404 HANDLER
// --------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// --------------------
// GLOBAL ERROR HANDLER
// --------------------
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// --------------------
// DATABASE CONNECTION
// --------------------
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();

export { isAuthenticated };
