import express from "express";
import mongoose from "mongoose";
import Products from "../models/productModel.js";

const router = express.Router();

/* ================================
   GET PRODUCTS BY SECTION
   ================================ */
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

/* ================================
   SEARCH PRODUCTS
   ================================ */
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

/* ================================
   PRODUCT DETAILS BY ID
   ================================ */
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

/* ================================
   SIMILAR PRODUCTS BY CATEGORY
   ================================ */
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

export default router;
