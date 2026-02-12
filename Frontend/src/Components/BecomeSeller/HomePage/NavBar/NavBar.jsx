import style from "./NavBar.module.css";
// Import Logo;
import NavLogo from "../../../../assets/Seller/navLogo.svg";
export default function NavBar() {
  return (
    <nav className={style.navContainer}>
      <div className={style.navLeft}>
        <img src={NavLogo} alt="Seller Logo" />

        <ul>
          <li>
            Sell Online
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li>
            Fees and Commission
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li>
            Grow
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li>
            Learn
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </li>
          <li>Shopsy</li>
        </ul>
      </div>

      <div className={style.navRight}>
        <ul>
          <li className={style.loginBtn}>Login</li>
          <li className={style.sellingBtn}>Start Selling</li>
        </ul>
      </div>
    </nav>
  );
}
