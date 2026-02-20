import style from "./button.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function button() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [showDelete, setShowDelete] = useState(false);

  const notify = () => {
    toast.warn("Account Deleted Successfully", { autoClose: 3000 });
  };

  const deleteUser = async () => {
    if (!user) {
      toast.error("You are not logged in");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/delete-user`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to delete account");
        return;
      }
      handleLogout();
      notify();
      navigate("/");
    } catch (err) {
      return { success: false, message: "Server error" };
    }
  };

  return (
    <>
      <div className={style.buttonContainer}>
        <button className={style.deactive}>Deactive Account</button>
        <button onClick={() => setShowDelete(true)} className={style.delete}>
          Delete Account
        </button>
      </div>
      {showDelete && (
        <div className={style.deletePermission}>
          <div className={style.permissionContainer}>
            <h1>Are you sure?</h1>
            <h2>This action cannot be undone.</h2>

            <div>
              <div>
                <button
                  className={style.cancelBtn}
                  onClick={() => setShowDelete(false)}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button className={style.confirmBtn} onClick={deleteUser}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
