import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "../Components/ProtectedRoute/AdminProtectedRoute";
import CheckoutGuard from "../Components/ProtectedRoute/checkOutGuard";
import Layout from "../Components/Layout/Layout";
// Home
import Home from "../Pages/Home/HomePage";

// Auth
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";

// Quick Links
import FlipkartMinutes from "../Pages/Category/FlipkartMinutes";

// Category Page;
import MobileAndTablets from "../Pages/Category/MobileAndTablets";
import Fashion from "../Pages/Category/Fashion";
import Electronics from "../Pages/Category/Electronics";
import HomeAndFurniture from "../Pages/Category/HomeAndFurniture";
import Appliance from "../Pages/Category/Home&ApplianceCategory";
import Beauty from "../Pages/Category/BeautyCategory";
import Grocery from "../Pages/Category/GroceryCategory";
import Flight from "../Pages/Category/Flight";

// Product List
import ProductList from "../Pages/ProductList/ProductList";

// Product Details
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

// Cart Page;
import CartPage from "../Pages/Cart/Cart";

// import profile
import Profile from "../Pages/Profile/ProfilePage";

// Buy Now Page;
import BuyNow from "../Pages/BuyNow/BuyNow";

// Payment page;
import Payment from "../Pages/Payment/Payment";

// Order Success;
import OrderSuccess from "../Pages/OrderSuccess/OrderSuccess";

//! All page related to order;
// My Orders;
import MyOrders from "../Pages/MyOrders/MyOrders";

// Order Status;
import OrderStatus from "../Pages/OrderStatus/OrderStatus";

// Import Price Drop
import PriceDrop from "../Pages/PriceDrop/PriceDrop";

// Import Stock available;
import Stock from "../Pages/StockAvailable/Stock";

//! Admin page and admin route ;
import AdminPage from "../Pages/Admin/Admin";
// Admin All orders;
import AdminOrder from "../Components/Admin/AdminOrders/Orders";
// Admin Delivery page;
import AdminDelivery from "../Components/Admin/DeliveryOrders/DeliveryOrders";
// Admin Return page;
import AdminReturn from "../Components/Admin/Returns/Returns";
// Admin Analytics;
import AdminAnalytics from "../Components/Admin/Analytics/Analytics";
// Create new product;
import CreateNewProducts from "../Components/Admin/NewProducts/NewProducts";

//! Seller Page;
import BecomeSeller from "../Pages/BecomeSeller/BecomeSeller";

//!======IMPORT ERROR PAGE=======
import NotFound from "../Components/NotFound/NotFound";

//!========IMPORT ADMIN EDIT PAGE========
import AdminEdit from "../Pages/Admin/AdminEditPage/Edit";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flipkart-minutes" element={<FlipkartMinutes />} />
      <Route path="/grocery" element={<Grocery />} />
      <Route path="/flight" element={<Flight />} />
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mobile-tablets" element={<MobileAndTablets />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/home-furniture" element={<HomeAndFurniture />} />
        <Route path="/appliance" element={<Appliance />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* ======Admin Page===== */}
      <Route element={<AdminProtectedRoute requiredRole="ADMIN" />}>
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminOrder />} />
          <Route path="delivery" element={<AdminDelivery />} />
          <Route path="returns" element={<AdminReturn />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="new_product" element={<CreateNewProducts />} />
        </Route>
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
      </Route>
      {/* ========PROTECTED ROUTE======= */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route element={<CheckoutGuard />}>
          <Route path="/buy-now" element={<BuyNow />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Route>
      {/* ======New Features====== */}
      <Route path="/price-drop" element={<PriceDrop />} />
      <Route path="/stock-available" element={<Stock />} />
      {/* =========Orders Page========= */}
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/order-status/:orderId" element={<OrderStatus />} />
      {/* ========Seller Page======== */}
      <Route path="/seller-dashboard" element={<BecomeSeller />} />
      {/* =========HANDLE ALL ERROR ROUTE========== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
