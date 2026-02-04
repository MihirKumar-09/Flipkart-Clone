import style from "./Page.module.css";
import { Link } from "react-router-dom";
export default function Page() {
  return (
    <div className={style.page}>
      <div className={style.breadcrumb}>
        <Link to="/">Home</Link>
        <span className={style.separator}>&gt;</span>

        <Link to="/account">My Account</Link>
        <span className={style.separator}>&gt;</span>

        <Link to="/my-orders">My Orders</Link>
        <span className={style.separator}>&gt;</span>

        <Link to="/my-orders">Order Id</Link>
      </div>
    </div>
  );
}
