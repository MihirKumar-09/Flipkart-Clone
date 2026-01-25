import AdminFooter from "./AdminFooter/Footer";
import AdminSidebar from "./AdminSidebar/Sidebar";
// import AdminOrders from ".AdminOrders/Orders";

import style from "./Admin.module.css";

export default function AdminPage() {
  return (
    <>
      <AdminFooter />

      <div className={style.adminLayout}>
        {/* LEFT SIDEBAR */}
        <AdminSidebar />

        {/* RIGHT CONTENT */}
        <div className={style.adminContent}>{/* <AdminOrders /> */}</div>
      </div>
    </>
  );
}
