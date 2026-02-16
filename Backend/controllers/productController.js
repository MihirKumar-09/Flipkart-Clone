import Products from "../models/productModel.js";
import mongoose from "mongoose";

// ========GET SECTION PRODUCT========
export const getSectionProducts = async (req, res, next) => {
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
    next(err);
  }
};

// =======SEARCH PRODUCTS========
export const searchProducts = async (req, res, next) => {
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
    next(err);
  }
};

// ======GET PRODUCT DETAILS======
export const getProductDetails = async (req, res, next) => {
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
    next(err);
  }
};

// =======SIMILAR PRODUCTS=========
export const similarProducts = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const products = await Products.find({ category }).limit(50);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// =====CREATE NEW PRODUCTS=======
export const createNewProducts = async (req, res, next) => {
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

    const normalizeCategory = category.trim().toLowerCase();
    const normalizeBrand = brand.trim().toLowerCase();

    const newProduct = new Products({
      name,
      description,
      price: Number(price),
      category: normalizeCategory,
      brand: normalizeBrand,
      stock: Number(stock),
      highlights: highlights ? highlights.split(",").map((h) => h.trim()) : [],
      image: imageData,
    });

    const saveProduct = await newProduct.save();
    res.status(200).json({ saveProduct });
  } catch (err) {
    next(err);
  }
};

// ======DELETE PRODUCT=======
export const deleteProduct = async (req, res, next) => {
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
    next(err);
  }
};
