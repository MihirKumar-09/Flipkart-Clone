import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import User from "./models/userModel.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = 8080;

// --------------------
// BASIC MIDDLEWARE
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// --------------------
// SESSION (must be BEFORE passport.session)
// --------------------
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// --------------------
// PASSPORT CONFIG (ORDER MATTERS)
// --------------------

// 1. Setup Strategy
passport.use(User.createStrategy());

console.log("LocalStrategy registered!");

// 2. Serialize / Deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 3. Init Passport AFTER sessions
app.use(passport.initialize());
app.use(passport.session());

// --------------------
// ROUTES
// --------------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

console.log("🔍 Mounting Routes...");
app.use("/api", productRoutes);
app.use("/api", userRoutes);

console.log("📌 Routes mounted successfully");

// --------------------
// MONGO + START SERVER
// --------------------
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✔ Connected to MongoDB");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✔ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
};

startServer();
