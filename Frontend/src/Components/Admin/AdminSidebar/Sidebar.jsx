import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
export default function AdminSidebar() {
  return (
    <div className={style.sidebar}>
      <NavLink to="/admin" end className={style.link}>
        Orders
      </NavLink>

      <NavLink to="delivery" className={style.link}>
        Delivery
      </NavLink>

      <NavLink to="returns" className={style.link}>
        Returns
      </NavLink>
      <NavLink to="/analytics" className={style.link}>
        Analytics
      </NavLink>
    </div>
  );
}
