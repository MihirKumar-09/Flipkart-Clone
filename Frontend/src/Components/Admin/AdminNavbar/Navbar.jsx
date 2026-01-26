import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import style from "./Navbar.module.css";

import Logo from "../../../assets/HomePage/LoginPageLogo.png";
import ProfilePic from "../../../assets/ProfilePic/profilepic.jpg";

export default function AdminFooter() {
  const [open, setOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    setOpen(false);
  };

  return (
    <div className={style.adminFooter}>
      {/* LEFT LOGO */}
      <img src={Logo} alt="Flipkart Logo" />

      {/* RIGHT PROFILE */}
      <div className={style.profile}>
        <img src={ProfilePic} alt="Profile Pic" />

        <button
          className={style.profileBtn}
          onClick={() => setOpen((prev) => !prev)}
        >
          {user?.username}
          <i className="fa-solid fa-angle-down"></i>
        </button>

        {open && (
          <div className={style.dropdown}>
            <div onClick={() => navigate("/profile")}>Profile</div>
            <div onClick={logout}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
}
