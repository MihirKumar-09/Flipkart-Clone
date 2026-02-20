import style from "./SearchBar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function SearchBar() {
  let [isLoginBtnHover, setIsLoginBtnHover] = useState(false);
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const notify = () => {
    toast.success("Logout Successfully", { autoClose: 3000 });
  };

  // handle login;
  const handleLogin = () => {
    if (!user) {
      navigate("/login");
    }
  };
  // handle logout;
  const logout = async () => {
    if (user) {
      handleLogout();
      notify();
    }
  };

  // handle profile;
  const profile = () => {
    if (user) navigate("/profile");
    else navigate("/login");
  };
  return (
    <div className={style.searchBar}>
      <div className={style.search}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search grocery products in Supermart" />
      </div>
      <div
        className={style.btn}
        onMouseEnter={() => setIsLoginBtnHover(true)}
        onMouseLeave={() => setIsLoginBtnHover(false)}
      >
        {user ? (
          <div>
            <i className="fa-regular fa-circle-user"></i>
            <span>{user.username}</span>
            <i
              className={`fa-solid ${
                isLoginBtnHover ? "fa-angle-up" : "fa-angle-down"
              }`}
            ></i>
          </div>
        ) : (
          <button onClick={handleLogin}>
            Login
            <i
              className={`fa-solid ${
                isLoginBtnHover ? "fa-angle-up" : "fa-angle-down"
              }`}
            ></i>
          </button>
        )}

        {isLoginBtnHover && (
          <div className={style.loginDetails}>
            {user ? (
              <>
                <div onClick={profile}>
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
                  <span>Whishlist</span>
                </div>
                <div>
                  <i className="fa-solid fa-store"></i>
                  <span>Bcome a Seller</span>
                </div>
                <div>
                  <i className="fa-solid fa-gift"></i>
                  <span>Rewards</span>
                </div>
                <div>
                  <i className="fa-regular fa-credit-card"></i>
                  <span>Gift Card</span>
                </div>
                <div>
                  <i className="fa-solid fa-bell"></i>
                  <span>Notification Preferences</span>
                </div>
                <div>
                  <i className="fa-solid fa-headset"></i>
                  <span>24x7 Customer Support</span>
                </div>
                <div>
                  <i className="fa-solid fa-arrow-up-right-dots"></i>
                  <span>Advertise</span>
                </div>
                <div>
                  <i className="fa-solid fa-download"></i>
                  <span>Download App</span>
                </div>
                <div onClick={logout}>
                  <i className="fa-solid fa-power-off"></i>
                  <span>Logout</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/signup" className="link">
                  <div className={style.signUp}>
                    <p>New customer?</p>
                    <a href="#">
                      <p>Sign Up</p>
                    </a>
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
                  <span>Whishlist</span>
                </div>
                <div>
                  <i className="fa-solid fa-store"></i>
                  <span>Bcome a Seller</span>
                </div>
                <div>
                  <i className="fa-solid fa-gift"></i>
                  <span>Rewards</span>
                </div>
                <div>
                  <i className="fa-regular fa-credit-card"></i>
                  <span>Gift Card</span>
                </div>
                <div>
                  <i className="fa-solid fa-bell"></i>
                  <span>Notification Preferences</span>
                </div>
                <div>
                  <i className="fa-solid fa-headset"></i>
                  <span>24x7 Customer Support</span>
                </div>
                <div>
                  <i className="fa-solid fa-arrow-up-right-dots"></i>
                  <span>Advertise</span>
                </div>
                <div>
                  <i className="fa-solid fa-download"></i>
                  <span>Download App</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className={style.btn}>
        <button>
          <i
            className="fa-solid fa-cart-shopping"
            style={{ fontSize: "1.2rem" }}
          ></i>
          Cart
        </button>
      </div>
    </div>
  );
}
