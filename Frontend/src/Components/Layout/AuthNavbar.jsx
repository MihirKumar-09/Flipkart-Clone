import "./AuthNavbar.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLogo from "../../assets/HomePage/LoginPageLogo.png";

// Use for modify the navbar according to the page
import { useLocation } from "react-router-dom";

export default function SignNavbar() {
  const [isAboutBtnHover, setIsAboutBtnHover] = useState(false);
  const [isLoginBtnHover, setIsLoginBtnHover] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // use for modify the navbar according to the page
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/product-list?search=${query.trim()}`);
  };

  return (
    <div className="sign-navbar">
      <div className="sign-options">
        {/* LOGO */}
        <Link to="/">
          <img src={MainLogo} alt="Flipkart Logo" className="login-logo" />
        </Link>

        {/* SEARCH BAR */}
        <div className="sign-search-bar">
          <input
            type="text"
            value={query}
            placeholder="Search for products, brands and more"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <span>
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleSearch}
            ></i>
          </span>
        </div>

        {/* LOGIN BUTTON */}
        <div
          className="login-btn"
          onMouseEnter={() => setIsLoginBtnHover(true)}
          onMouseLeave={() => setIsLoginBtnHover(false)}
        >
          <button>Login</button>

          {isLoginBtnHover ? (
            <div className="authLoginBtnOptions">
              <Link to="/signup" className="link">
                <div className="authSignUpOption">
                  <p>New customer?</p>
                  <a>Sign Up</a>
                </div>
              </Link>
              <div>
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
                <i class="fa-solid fa-gift"></i>
                <span>Rewards</span>
              </div>
              <div>
                <i class="fa-regular fa-credit-card"></i>
                <span>Gift Cards</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* SELLER BUTTON */}
        {!isCartPage && (
          <div className="seller">
            <button>Become a Seller</button>
          </div>
        )}

        {/* MORE BUTTON */}
        {!isCartPage && (
          <div
            className="more aboutDiv"
            onMouseEnter={() => setIsAboutBtnHover(true)}
            onMouseLeave={() => setIsAboutBtnHover(false)}
          >
            <button>More</button>
            <i
              className={`fa-solid ${
                isAboutBtnHover ? "fa-angle-up" : "fa-angle-down"
              }`}
            ></i>

            {isAboutBtnHover && (
              <div className="aboutBtnOptions more-about-options">
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
        )}

        {/* CART BUTTON */}
        {!isCartPage && (
          <div className="cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <Link to="/cart">
              <button>Cart</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
