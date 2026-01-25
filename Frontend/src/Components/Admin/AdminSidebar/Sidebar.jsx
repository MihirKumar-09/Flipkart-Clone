import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
export default function AdminSidebar() {
  return (
    <div className={style.sidebar}>
      <h3>Admin Panel</h3>

      <NavLink to="/admin" end className={style.link}>
        Orders
      </NavLink>

      <NavLink to="/admin/products" className={style.link}>
        Products
      </NavLink>

      <NavLink to="/admin/users" className={style.link}>
        Users
      </NavLink>
    </div>
  );
}
