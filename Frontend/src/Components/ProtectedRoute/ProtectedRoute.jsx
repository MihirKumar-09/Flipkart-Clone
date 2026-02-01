import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/check", {
          withCredentials: true,
        });

        console.log("AUTH CHECK RESPONSE:", res.data);
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
