import style from "./Bottom.module.css";
import SellerLogo from "../../../../assets/Seller/navLogo.svg";
export default function Bottom() {
  return (
    <div className={style.bottomFooter}>
      <img src={SellerLogo} alt="Seller Logo" />
      <p>&copy; 2023 Flipkart. All Right Reserved</p>
      <span>
        <p>Privacy Policy</p>
        <ul>
          <li>Terms of Use</li>
        </ul>
      </span>
    </div>
  );
}
