import express from "express";
const router = express.Router();

import isAuth from "../middlewares/isAuth.js";
import { allAddress, saveAddress } from "../controllers/addressController.js";

// =======GET ALL ADDRESS========
router.get("/all/address", isAuth, allAddress);

// Save address into DB
router.post("/address", isAuth, saveAddress);
export default router;
