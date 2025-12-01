import mongoose from "mongoose";
import initData from "./products.js"; //All fake data
import Products from "../models/productModel.js"; //My product model
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect with mongoDB");
  } catch (err) {
    console.log(err);
  }
};

const initDB = async () => {
  try {
    await connectDB(); // Connect first

    await Products.deleteMany({});
    console.log("🧹 Old products deleted");

    // Flatten all product arrays into a single array
    const allProducts = [
      ...initData.mobiles,
      ...initData.laptops,
      ...initData.menShirts,
      ...initData.menJeans,
      ...initData.saree,
      ...initData.menShoes,
      ...initData.womenShoes,
      ...initData.headphones,
      ...initData.womenCropTop,
      ...initData.womenBodyConeDress,
      ...initData.kutri,
      ...initData.kurta,
      ...initData.jewelry,
      ...initData.hoodies,
      ...initData.furniture,
      ...initData.gym,
      ...initData.bras,
      ...initData.homeAppliance,
      ...initData.teddyBear,
      ...initData.grocery,
      ...initData.sports,
      ...initData.books,
      ...initData.beauty,
      ...initData.homeDecorate,
      ...initData.dslrCamera,
      ...initData.HairAndSkinCare,
      ...initData.adventure,
    ];
    await Products.insertMany(allProducts);
    console.log("✅ Fake products inserted successfully");
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
  }
};

initDB();
