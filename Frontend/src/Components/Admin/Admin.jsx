import AdminFooter from "./AdminNavbar/Navbar";
import AdminSidebar from "./AdminSidebar/Sidebar";
import { Outlet } from "react-router-dom";

import style from "./Admin.module.css";

export default function AdminPage() {
  return (
    <>
      <AdminFooter />

      <div className={style.adminLayout}>
        <AdminSidebar />

        <div className={style.adminContent}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
