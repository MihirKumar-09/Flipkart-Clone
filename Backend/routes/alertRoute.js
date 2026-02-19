import express from "express";
import { createAlert, priceDrop } from "../controllers/alertController.js";

const router = express.Router();

// ==========BACK IN STOCK=========
router.post("/alerts", createAlert);
// =========PRICE DROP==========
router.post("/alerts/price", priceDrop);

export default router;
