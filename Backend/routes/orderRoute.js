import express from "express";
import isAuth from "../middlewares/isAuth.js";

import {
  cancelOrder,
  cancelReturn,
  downloadInvoice,
  getAllOrders,
  orderDetails,
  placeOrder,
  returnOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// ========PLACE ORDER=========
router.post("/place", isAuth, placeOrder);
// =========GET MY ORDER========
router.get("/my-orders", isAuth, getAllOrders);

// =======GET SPECIFIC ORDER==========
router.get("/:orderId", isAuth, orderDetails);
// ==========DOWNLOAD INVOICE===========
router.get("/:orderId/invoice", isAuth, downloadInvoice);

// ========CANCEL ORDER=============
router.patch("/:orderId/cancel", isAuth, cancelOrder);

// =========RETURN ORDER============
router.patch("/:orderId/return", isAuth, returnOrder);

// ============CANCEL ORDER=========
router.patch("/:orderId/cancel-return", isAuth, cancelReturn);

export default router;
