import { Routes, Route } from "react-router-dom";
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
import ProductDetils from "../Pages/ProductDetails/ProductDetails";

// Cart Page;
import CartPage from "../Pages/Cart/Cart";

// import profile
import Profile from "../Pages/Profile/ProfilePage";

// Buy Now Page;
import BuyNow from "../Pages/BuyNow/BuyNow";

// Import Price Drop
import PriceDrop from "../Pages/PriceDrop/PriceDrop";

// Import Stock available;
import Stock from "../Pages/StockAvailabe/Stock";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flipkart-minutes" element={<FlipkartMinutes />} />
      <Route path="/grocery" element={<Grocery />} />
      <Route path="/flight" element={<Flight />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/buy-now" element={<BuyNow />} />
      <Route path="/price-drop" element={<PriceDrop />} />
      <Route path="/stock-availabel" element={<Stock />} />

      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mobile-tablets" element={<MobileAndTablets />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/home-furniture" element={<HomeAndFurniture />} />
        <Route path="/appliance" element={<Appliance />} />
        <Route path="/beauty" element={<Beauty />} />
        {/* Show Product List */}
        <Route path="product-list" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetils />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
