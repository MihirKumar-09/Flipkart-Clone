import style from "./button.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function button() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const deleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch("http://localhost:8080/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setUser(null);
        navigate("/");
        console.log("Account permanently deleted");
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <div className={style.buttonContainer}>
      <button className={style.deactive}>Deactive Account</button>
      <button onClick={deleteUser} className={style.delete}>
        Delete Account
      </button>
    </div>
  );
}
