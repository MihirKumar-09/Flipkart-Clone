import style from "./SearchBar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function SearchBar() {
  let [isLoginBtnHover, setIsLoginBtnHover] = useState(false);
  return (
    <div className={style.searchBar}>
      <div className={style.search}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search grocery products in Supermart" />
      </div>
      <div
        className={style.btn}
        onMouseEnter={() => setIsLoginBtnHover(true)}
        onMouseLeave={() => setIsLoginBtnHover(false)}
      >
        <button>
          Login
          <i class="fa-solid fa-angle-down"></i>
        </button>

        {isLoginBtnHover && (
          <div className={style.loginDetails}>
            <Link to="/signup" className="link">
              <div className={style.signUp}>
                <p>New customer?</p>
                <a href="#">
                  <p>Sign Up</p>
                </a>
              </div>
            </Link>
            <div>
              <i class="fa-regular fa-circle-user"></i>
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
              <span>Whishlist</span>
            </div>
            <div>
              <i class="fa-solid fa-store"></i>
              <span>Bcome a Seller</span>
            </div>
            <div>
              <i class="fa-solid fa-gift"></i>
              <span>Rewards</span>
            </div>
            <div>
              <i class="fa-regular fa-credit-card"></i>
              <span>Gift Card</span>
            </div>
            <div>
              <i class="fa-solid fa-bell"></i>
              <span>Notification Preferences</span>
            </div>
            <div>
              <i class="fa-solid fa-headset"></i>
              <span>24x7 Customer Support</span>
            </div>
            <div>
              <i class="fa-solid fa-arrow-up-right-dots"></i>
              <span>Advertise</span>
            </div>
            <div>
              <i class="fa-solid fa-download"></i>
              <span>Download App</span>
            </div>
          </div>
        )}
      </div>

      <div className={style.btn}>
        <button>
          <i
            class="fa-solid fa-cart-shopping"
            style={{ fontSize: "1.2rem" }}
          ></i>
          Cart
        </button>
      </div>
    </div>
  );
}
