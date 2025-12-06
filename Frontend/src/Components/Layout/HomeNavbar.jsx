import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./HomeNavBar.css";
import MainLogo from "../../assets/HomePage/MainLogo.svg";
import { useAuth } from "../../Context/AuthContext";
// Import React-Toastify;
import { ToastContainer, toast } from "react-toastify";

export default function HomeNavBar() {
  const [isLoginBtnHover, setIsLoginBtnHover] = useState(false);
  const [isAboutBtnHover, setIsAboutBtnHover] = useState(false);
  const [query, setQuery] = useState("");
  const { user, handleLogout } = useAuth();

  const navigate = useNavigate();

  const notify = () => {
    toast.success("Logout Successfully", { autoClose: 3000 });
  };

  const handleSearch = () => {
    if (!query) return;
    navigate(`/product-list?search=${query}`);
  };

  // Handle logout;
  const logout = async () => {
    if (user) {
      handleLogout();
      notify();
    }
  };

  // handle Cart;
  const handleCart = () => {
    if (user) navigate("/cart");
    else navigate("/login");
  };

  // Handle profile;
  const handleProfile = () => {
    if (user) navigate("/profile");
    else navigate("/login");
  };

  return (
    <div className="navBar">
      <div className="logoAndSearchBar">
        <div className="logo">
          <i className="fa-solid fa-bars"></i>
          <Link to="/">
            <img src={MainLogo} alt="Flipkart logo" />
          </Link>
        </div>

        <div className="searchBar">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          ></i>
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>

      <div className="details">
        <div className="mobileDnl">
          <i className="fa-solid fa-mobile-screen-button"></i>
        </div>

        <div
          className="loginDiv"
          onMouseEnter={() => setIsLoginBtnHover(true)}
          onMouseLeave={() => setIsLoginBtnHover(false)}
        >
          {user ? (
            <button className="loginBtn">
              <i className="fa-regular fa-circle-user"></i>
              {user.username}
              <i className="fa-solid fa-angle-down arrowIcon"></i>
            </button>
          ) : (
            <Link to="/login" className="link">
              <button className="loginBtn">
                <i className="fa-regular fa-circle-user"></i>Login
                <i className="fa-solid fa-angle-down arrowIcon"></i>
              </button>
            </Link>
          )}

          {isLoginBtnHover && (
            <div
              className="loginBtnOptions"
              onMouseEnter={() => setIsLoginBtnHover(true)}
              onMouseLeave={() => setIsLoginBtnHover(false)}
            >
              {!user ? (
                <div className="loginOptions">
                  <Link to="/signup" className="link">
                    <div className="signUpOption">
                      <p>New customer?</p>
                      <a>Sign Up</a>
                    </div>
                  </Link>
                  <div onClick={handleProfile}>
                    <i className="fa-regular fa-circle-user"></i>
                    <span>My Profile</span>
                  </div>
                  <div>
                    <i className="fa-brands fa-gg"></i>
                    <span>Flipkart Plus Zone</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-box-open"></i>
                    <span>Orders</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-heart"></i>
                    <span>Wishlist</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-gift"></i>
                    <span>Rewards</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-credit-card"></i>
                    <span>Gift Cards</span>
                  </div>
                </div>
              ) : (
                <div className="accountOptions">
                  <Link to="/profile" className="link-style">
                    <div>
                      <i className="fa-regular fa-circle-user"></i>
                      <span>My Profile</span>
                    </div>
                  </Link>
                  <div>
                    <i class="fa-brands fa-bitcoin"></i>
                    <span>SuperCoin Zone</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-circle-radiation"></i>
                    <span>Flipkart Plus Zone</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-box"></i>
                    <span>Orders</span>
                  </div>
                  <div>
                    <i class="fa-regular fa-heart"></i>
                    <span>Whishlist</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-tag"></i>
                    <span>Coupons</span>
                  </div>
                  <div>
                    <i className="fa-regular fa-credit-card"></i>
                    <span>Gift Cards</span>
                  </div>
                  <div>
                    <i class="fa-regular fa-bell"></i>
                    <span>Notification</span>
                  </div>
                  <div onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="cartBtn" onClick={handleCart}>
          <i className="fa-brands fa-opencart"></i>
          <span>Cart</span>
        </button>
        <button className="becomeSeller">
          <i className="fa-solid fa-store"></i>
          <span>Become a Seller</span>
        </button>

        <div
          className="aboutDiv"
          onMouseEnter={() => setIsAboutBtnHover(true)}
          onMouseLeave={() => setIsAboutBtnHover(false)}
        >
          <button className="aboutBtn">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

          {isAboutBtnHover && (
            <div className="aboutBtnOptions">
              <div>
                <i className="fa-regular fa-bell"></i>
                <span>Notification Preferences</span>
              </div>
              <div>
                <i className="fa-solid fa-headset"></i>
                <span>24x7 Customer Care</span>
              </div>
              <div>
                <i className="fa-solid fa-arrow-up-right-dots"></i>
                <span>Advertise</span>
              </div>
              <div>
                <i className="fa-solid fa-download"></i>
                <span>Download App</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
