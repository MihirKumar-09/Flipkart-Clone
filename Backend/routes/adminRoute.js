import express, { json } from "express";
const router = express.Router();
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
  analyticsOrders,
  deliveryOrder,
  getAllOrder,
  lowStock,
  monthlyRevenue,
  paymentMethod,
  returnOrders,
  topSelling,
  updateOrderStatus,
} from "../controllers/adminController.js";

// Admin check ;
router.get("/check-admin", isAuth, isAdmin, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
// =========GET ALL ORDERS========
router.get("/orders", isAuth, isAdmin, getAllOrder);

// =======UPDATE ORDER STATUS=========
router.patch("/orders/:id", isAuth, isAdmin, updateOrderStatus);

// ========GET DELIVERY ORDERS==========
router.get("/orders/delivery", isAuth, isAdmin, deliveryOrder);

// =========GET RETURN ORDERS=========
router.get("/orders/returns", isAdmin, returnOrders);

// =======GET ANALYTICS ORDER======
router.get("/orders/analytics", isAuth, isAdmin, analyticsOrders);

// ========MONTHLY REVENUE=========
router.get(
  "/orders/analytics/monthly-revenue",
  isAuth,
  isAdmin,
  monthlyRevenue,
);

// =========TOP SELLING PRODUCTS=========
router.get("/orders/analytics/top-products", isAuth, isAdmin, topSelling);

// ========FETCH LOW STOCK PRODUCTS=======
router.get("/orders/analytics/low-stocks", isAuth, isAdmin, lowStock);

// ==========FETCH PAYMENT METHOD==========
router.get("/orders/analytics/payment-method", isAuth, isAdmin, paymentMethod);

export default router;
