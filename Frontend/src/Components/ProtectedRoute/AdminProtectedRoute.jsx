import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await axios.get("http://localhost:8080/api/admin/check-admin", {
          withCredentials: true,
        });

        // admin → allow render
        setIsAdmin(false);
      } catch (err) {
        toast.error("Admin access only");
        navigate("/", { replace: true });
      }
    };

    checkAdmin();
  }, []);

  return <Outlet />;
};

export default AdminProtectedRoute;
