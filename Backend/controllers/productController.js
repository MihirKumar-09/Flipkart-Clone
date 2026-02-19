import Products from "../models/productModel.js";
import mongoose from "mongoose";
import { sendEmail } from "../utils/sendEmail.js";
import Alert from "../models/alertModel.js";

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
    if (price === undefined || price === "") {
      errors.price = "Price is required";
    } else if (isNaN(price) || Number(price) <= 0) {
      errors.price = "Price must be grater then 0";
    }
    if (!category) errors.category = "Category is required";
    if (!brand) errors.brand = "Brand is required";
    if (stock === undefined || stock === "") errors.stock = "Stock is required";
    else if (isNaN(stock) || Number(stock) < 0)
      errors.stock = "Stock cannot be negative";
    if (!highlights) errors.highlights = "Highlights are required";
    if (!req.files || req.files.length === 0) {
      errors.images = "At least one image required";
    }

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

// ==========EDIT PRODUCT=======
// Get Form
export const getProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
export const updateForm = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldPrice = product.price;
    const oldStock = product.stock;

    const { name, description, price, stock, brand, category, highlights } =
      req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (brand) product.brand = brand;
    if (category) product.category = category;

    if (highlights) {
      try {
        product.highlights = JSON.parse(highlights);
      } catch {
        product.highlights = highlights.split(",").map((h) => h.trim());
      }
    }

    if (req.files && req.files.length > 0) {
      const imagesArray = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));
      product.image = imagesArray;
    }

    await product.save();

    const newPrice = product.price;
    const newStock = product.stock;

    //!===========PRICE DROP============

    if (newPrice < oldPrice) {
      const priceAlerts = await Alert.find({
        productId,
        type: "price",
        notified: false,
      });

      for (const alert of priceAlerts) {
        if (newPrice <= alert.targetPrice) {
          try {
            await sendEmail(
              alert.email,
              "Price Dropped!",
              `
                <h2>Good News!</h2>
                <p>${product.name} price dropped.</p>
                <p>Original Price: ₹${oldPrice}</p>
                <p>Your Target Price: ₹${alert.targetPrice}</p>
                <p>New Price: ₹${newPrice}</p>
                
              `,
            );

            alert.notified = true;
            await alert.save();

            console.log("Price drop email sent to:", alert.email);
          } catch (err) {
            console.error("Failed to send price email:", alert.email);
          }
        }
      }
    }

    //! ============STOCK ALERT==========

    if (oldStock === 0 && newStock > 0) {
      const stockAlerts = await Alert.find({
        productId,
        type: "stock",
        notified: false,
      });

      console.log("Stock alerts found:", stockAlerts.length);

      for (const alert of stockAlerts) {
        try {
          await sendEmail(
            alert.email,
            "Product Back in Stock!",
            `<p>The product <strong>${product.name}</strong> is now back in stock. Hurry and buy now!</p>`,
          );

          alert.notified = true;
          await alert.save();

          console.log("Stock email sent to:", alert.email);
        } catch (err) {
          console.error("Failed to send stock email:", alert.email);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
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
