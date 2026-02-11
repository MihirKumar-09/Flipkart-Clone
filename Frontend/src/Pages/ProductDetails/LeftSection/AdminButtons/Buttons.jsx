import style from "./Buttons.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Buttons({ product }) {
  const navigate = useNavigate();

  // Fetch delete method to remove the product;
  const handleRemove = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/product/${product._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (res.status == 404) {
        navigate("/");
        return;
      }
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }
      toast.success("Delete successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
  );
}
