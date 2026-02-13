import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import NavLogo from "../../../../assets/Seller/navLogo.svg";
import { useState } from "react";

export default function NavBar() {
  const [openMenus, setOpenMenus] = useState({});

  const menuItems = [
    {
      label: "Sell Online",
      options: [
        { label: "Create Account", link: "#" },
        { label: "List Products", link: "#" },
        { label: "Storage & Shipping", link: "#" },
        { label: "Receive Payments", link: "#" },
        { label: "Grow Faster", link: "#" },
        { label: "Seller App", link: "#" },
        { label: "Help & Support", link: "#" },
      ],
    },
    {
      label: "Fees and Commission",
      options: [
        { label: "Payment Cycle", link: "#" },
        { label: "Fee Type", link: "#" },
        { label: "Calculate Gross Margin", link: "#" },
      ],
    },
    {
      label: "Grow",
      options: [
        { label: "FAssured badge", link: "#" },
        { label: "Insights & Tools", link: "#" },
        { label: "Flipkart Ads", link: "#" },
        { label: "Flipkart Value Service", link: "#" },
        { label: "Shopping Festive", link: "#" },
        { label: "Service Partner", link: "#" },
      ],
    },
    {
      label: "Learn",
      options: [
        { label: "FAQs", link: "#" },
        { label: "Seller Success Stories", link: "#" },
        { label: "Seller Blogs", link: "#" },
      ],
    },
    {
      label: "Shopsy",
      options: [],
    },
  ];

  const toggleMenu = (index, value) => {
    setOpenMenus((prev) => ({ ...prev, [index]: value }));
  };
  return (
    <div className={style.navContainer}>
      <div className={style.navLeft}>
        <span>
          <img src={NavLogo} alt="Seller Logo" />
        </span>
        <span>
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => toggleMenu(index, true)}
                onMouseLeave={() => toggleMenu(index, false)}
              >
                {item.label}
                {item.options.length > 0 && (
                  <span className={style.dropDownIcon}>
                    {openMenus[index] ? (
                      <i className="fa-solid fa-angle-up"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down"></i>
                    )}
                  </span>
                )}

                {openMenus[index] && item.options.length > 0 && (
                  <div className={style.dropDown}>
                    <ul>
                      {item.options.map((option, i) => (
                        <li key={i}>
                          <Link to={option.link} className={style.link}>
                            {option.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </span>
      </div>
      <div className={style.navRight}>
        <ul>
          <li>Login</li>
          <li>Start Selling</li>
        </ul>
      </div>
    </div>
  );
}
