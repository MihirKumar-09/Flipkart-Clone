import style from "./button.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function button() {
  const navigate = useNavigate();
  const { user, deleteUser } = useAuth();

  const notify = () => {
    toast.warn("Account Deleted Successfully", { autoClose: 3000 });
  };

  const handleDeleteUser = async () => {
    if (!user) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const res = await deleteUser(); // <-- NOW you await

    if (res.success) {
      navigate("/"); // redirect here
      notify(); // toast here
    } else {
      toast.error(res.message || "Delete failed");
    }
  };

  return (
    <div className={style.buttonContainer}>
      <button className={style.deactive}>Deactive Account</button>
      <button onClick={handleDeleteUser} className={style.delete}>
        Delete Account
      </button>
    </div>
  );
}
