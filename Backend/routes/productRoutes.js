import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// =======CONFIGURE CLOUDINARY=========
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//========SET-UP STORAGE========
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_format: ["jpg", "png", "jpeg"],
  },
});

// =======DEFINE UPLOAD FILE========
const upload = multer({ storage });
import {
  createNewProducts,
  deleteProduct,
  getProduct,
  getProductDetails,
  getSectionProducts,
  searchProducts,
  similarProducts,
  updateForm,
} from "../controllers/productController.js";

const router = express.Router();

//========GET PRODUCT SECTION WISE=========
router.get("/products/section", getSectionProducts);

//=======SEARCH PRODUCTS========
router.get("/products/search", searchProducts);

// =============PRODUCTS DETAILS BY ID==========
router.get("/products/:id", getProductDetails);

// ============SIMILAR PRODUCT CATEGORY============
router.get("/products/category/:category", similarProducts);

// ============ CREATE NEW PRODUCTS===========
router.post("/product", isAdmin, upload.array("images", 5), createNewProducts);

// =========UPDATE PRODUCT=========
// Get Form
router.get("/products/:id", isAdmin, getProduct);
// Update form
router.put(
  "/products/update/:id",
  isAdmin,
  upload.array("image", 5),
  updateForm,
);
// ==========DELETE PRODUCTS===========
router.delete("/product/:id", isAdmin, deleteProduct);
export default router;
