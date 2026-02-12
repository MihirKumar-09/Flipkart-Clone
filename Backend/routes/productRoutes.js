import express, { json } from "express";
import mongoose from "mongoose";
import Products from "../models/productModel.js";
import isAdmin from "../middlewares/isAdmin.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure cloudinary;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set-up storage;
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_format: ["jpg", "png", "jpeg"],
  },
});

// Define upload file;
const upload = multer({ storage });

const router = express.Router();

router.get("/products/section", async (req, res) => {
  try {
    let { category, brand, limit, random } = req.query;

    limit = Number(limit);
    if (!limit || limit <= 0) limit = 1000;

    const pipeline = [];

    if (category) {
      const categoryArray = category.split(",").map((c) => c.trim());
      pipeline.push({
        $match: { category: { $in: categoryArray } },
      });
    }

    if (brand) {
      const brandArray = brand.split(",").map((b) => b.trim());
      pipeline.push({
        $match: { brand: { $in: brandArray } },
      });
    }

    if (random === "true") {
      pipeline.push({ $sample: { size: limit } });
    } else {
      pipeline.push({ $limit: limit });
    }

    const products = await Products.aggregate(pipeline);
    res.status(200).json(products);
  } catch (err) {
    console.error("Section products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/products/search", async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.status(200).json([]);

    const [allCategories, allBrands] = await Promise.all([
      Products.distinct("category"),
      Products.distinct("brand"),
    ]);

    const words = query.split(/\s+/);

    let matchedCategories = [];
    let matchedBrands = [];

    words.forEach((word) => {
      const regex = new RegExp(word, "i");

      matchedCategories.push(...allCategories.filter((c) => regex.test(c)));
      matchedBrands.push(...allBrands.filter((b) => regex.test(b)));
    });

    matchedCategories = [...new Set(matchedCategories)];
    matchedBrands = [...new Set(matchedBrands)];

    const matchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { brand: { $in: matchedBrands } },
        { category: { $in: matchedCategories } },
      ],
    };

    const products = await Products.find(matchQuery).limit(100);
    res.status(200).json(products);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

// Product details by product ID;
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Product details error:", err);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

// Similar product category;
router.get("/products/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const products = await Products.find({ category }).limit(50);
    res.status(200).json(products);
  } catch (err) {
    console.error("Category products error:", err);
    res.status(500).json({ error: "Failed to fetch category products" });
  }
});

// Create new products into DB;
router.post(
  "/product",
  isAdmin,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, description, price, category, brand, stock, highlights } =
        req.body;

      const errors = {};

      if (!name) errors.name = "Name is required";
      if (!description) errors.description = "Description is required";
      if (!price) errors.price = "Price is required";
      if (!category) errors.category = "Category is required";
      if (!brand) errors.brand = "Brand is required";
      if (!stock) errors.stock = "Stock is required";
      if (!highlights) errors.highlights = "Highlights are required";

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
      }

      const imageData = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));

      const newProduct = new Products({
        name,
        description,
        price: Number(price),
        category,
        brand,
        stock: Number(stock),
        highlights: highlights
          ? highlights.split(",").map((h) => h.trim())
          : [],
        image: imageData,
      });

      const saveProduct = await newProduct.save();
      res.status(200).json({ saveProduct });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create new error" });
    }
  },
);
// Delete specific product;
router.delete("/product/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    // find product;
    const deleteProduct = await Products.findByIdAndDelete(id);
    // If product not exist;
    if (!deleteProduct) {
      return res.status(404).json({
        message: "Product already deleted",
        success: false,
      });
    }
    res
      .status(200)
      .json({ message: "product delete successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});
export default router;
