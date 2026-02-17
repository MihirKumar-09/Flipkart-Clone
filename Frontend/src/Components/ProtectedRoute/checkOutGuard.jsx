import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function CheckoutGuard() {
  const location = useLocation();

  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));
  const addressId = localStorage.getItem("selectedAddressId");

  if (!checkoutData || !checkoutData.items?.length) {
    return <Navigate to="/" replace />;
  }
  if (location.pathname === "/payment" && !addressId) {
    return <Navigate to="/buy-now" replace />;
  }

  return <Outlet />;
}
