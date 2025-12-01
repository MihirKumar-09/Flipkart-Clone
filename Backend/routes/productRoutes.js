import express from "express";
const router = express.Router();
import Products from "../models/productModel.js";

// Route for different section
router.get("/products/section", async (req, res) => {
  try {
    let { category, brand, limit, random } = req.query;

    limit = Number(limit) || 1000;

    // Convert comma-separated categories → array
    let categoryArray = category ? category.split(",") : null;

    // Convert comma-separated brands → array
    let brandArray = brand ? brand.split(",") : null;

    let pipeline = [];

    if (categoryArray) {
      pipeline.push({
        $match: {
          category: { $in: categoryArray },
        },
      });
    }

    if (brandArray) {
      pipeline.push({
        $match: {
          brand: { $in: brandArray },
        },
      });
    }
    if (random === "true") {
      pipeline.push({ $sample: { size: limit } });
    } else {
      pipeline.push({ $limit: limit });
    }

    const products = await Products.aggregate(pipeline);

    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route for search

router.get("/products/search", async (req, res) => {
  try {
    let query = req.query.q?.trim() || "";
    if (!query) return res.json([]);

    // AUTO-LOAD from DB
    const allCategories = await Products.distinct("category");
    const allBrands = await Products.distinct("brand");

    const words = query.split(" ");

    let matchedCategories = [];
    let matchedBrands = [];

    words.forEach((w) => {
      const regex = new RegExp(w, "i");

      matchedCategories.push(...allCategories.filter((c) => regex.test(c)));

      matchedBrands.push(...allBrands.filter((b) => regex.test(b)));
    });

    matchedCategories = [...new Set(matchedCategories)];
    matchedBrands = [...new Set(matchedBrands)];

    let match = {
      $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
        { brand: { $in: matchedBrands } },
        { category: { $in: matchedCategories } },
      ],
    };

    const products = await Products.find(match).limit(100);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

// Product Details Route
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.log("Faild to fetch product details", err);
    res.status(500).json({ error: "Product not found" });
  }
});

// Similar Products
router.get("/products/category/:category", async (req, res) => {
  const { category } = req.params;
  const products = await Products.find({ category });
  res.json(products);
});

export default router;
