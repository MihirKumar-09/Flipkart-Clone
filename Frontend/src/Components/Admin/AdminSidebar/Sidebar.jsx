import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";

export default function AdminSidebar() {
  return (
    <div className={style.sidebar}>
      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        Orders
      </NavLink>

      <NavLink
        to="delivery"
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        Delivery
      </NavLink>

      <NavLink
        to="returns"
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        Returns
      </NavLink>

      <NavLink
        to="analytics"
        className={({ isActive }) =>
          isActive ? `${style.link} ${style.active}` : style.link
        }
      >
        Analytics
      </NavLink>
    </div>
  );
}
