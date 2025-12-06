import style from "./button.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function button() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const notify = () => {
    toast.warn("Account Deleted Successfully", { autoClose: 3000 });
  };

  const deleteUser = async () => {
    if (!user) {
      toast.error("You are not logged in");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to delete account");
        return;
      }
      handleLogout(); //Perform logout to clean the session and cookies;
      notify();
      navigate("/");
    } catch (err) {
      return { success: false, message: "Server error" };
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
