// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminProtectedRoute = ({ requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/check", {
          withCredentials: true, // very important if you use cookies/sessions
        });
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>; // optional spinner

  if (!user) return <Navigate to="/login" replace />; // not logged in
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/" replace />; // not authorized

  return <Outlet />; // render nested routes
};

export default AdminProtectedRoute;
