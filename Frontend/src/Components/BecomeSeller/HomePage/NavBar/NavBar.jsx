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
        { label: "Create Account", link: "/create-account" },
        { label: "List Products", link: "/list-products" },
        { label: "Storage & Shipping", link: "/storage-shipping" },
        { label: "Receive Payments", link: "/receive-payments" },
        { label: "Grow Faster", link: "/grow-faster" },
        { label: "Seller App", link: "/seller-app" },
        { label: "Help & Support", link: "/help-support" },
      ],
    },
    {
      label: "Fees and Commission",
      options: [
        { label: "Fee Structure", link: "/fee-structure" },
        { label: "Payment Terms", link: "/payment-terms" },
        { label: "Policies", link: "/policies" },
      ],
    },
    {
      label: "Grow",
      options: [
        { label: "Marketing Tools", link: "/marketing-tools" },
        { label: "Analytics", link: "/analytics" },
      ],
    },
    {
      label: "Learn",
      options: [
        { label: "Tutorials", link: "/tutorials" },
        { label: "FAQ", link: "/faq" },
        { label: "Guides", link: "/guides" },
      ],
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
                  <span className="material-symbols-outlined">
                    keyboard_arrow_down
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
