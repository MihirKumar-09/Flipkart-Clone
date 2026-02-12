import style from "./Buttons.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useAuth } from "../../../../Context/AuthContext";
export default function Buttons({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch delete method to remove the product;
  const handleRemove = async () => {
    if (!product?._id) {
      console.log("Product ID missing");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/product/${product._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      // Handle 404 error;
      if (res.status === 404) {
        toast.error("Product not found");
        navigate("/");
        return;
      }
      // Handle unauthorized;
      if (res.status === 401 || res.status === 403) {
        toast.error("Not authorized");
        return;
      }
      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        toast.error(data?.message || "Delete failed");
        return;
      }

      toast.success("Deleted successfully");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {user?.role === "ADMIN" && (
        <div className={style.buttonGroup}>
          <button>
            <span>EDIT</span>
            <span>
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
          </button>
          <button onClick={handleRemove}>
            <span>DELETE</span>
            <span>
              <i class="fa-regular fa-trash-can"></i>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
