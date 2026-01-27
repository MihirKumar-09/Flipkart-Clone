import AdminFooter from "./AdminNavbar/Navbar";
import AdminSidebar from "./AdminSidebar/Sidebar";
import AdminOrders from "./AdminOrders/Orders";

import style from "./Admin.module.css";

export default function AdminPage() {
  return (
    <>
      <AdminFooter />

      <div className={style.adminLayout}>
        <AdminSidebar />

        <div className={style.adminContent}>
          <AdminOrders />
        </div>
      </div>
    </>
  );
}
