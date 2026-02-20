import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
export default function GroceyNavbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.back}>
        <div className={styles.left}>
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1>Grocery</h1>
        </div>
        <div className={styles.time}>
          <p>Daily</p>
          <h1>8 AM - 5 PM</h1>
        </div>
      </div>
    </div>
  );
}
