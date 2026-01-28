import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const AdminProtectedRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/auth/check", {
          withCredentials: true,
        });

        setIsAdmin(res.data.user?.role === "ADMIN");
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return <div>Loading...</div>;
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminProtectedRoute;
