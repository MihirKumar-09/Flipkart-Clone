import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/check", {
          withCredentials: true,
        });
        setOk(true);
      } catch (err) {
        setOk(false);
      }
    };

    checkAuth();
  }, []);

  if (ok === null) return null;

  return ok ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
