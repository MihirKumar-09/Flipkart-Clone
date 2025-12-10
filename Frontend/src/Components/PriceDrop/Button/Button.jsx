import style from "./Button.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Button() {
  const navigate = useNavigate();
  const notify = () => {
    toast.success("Alert Set Successfully", {
      autoClose: 2000,
      theme: "dark",
    });
  };
  //   handle set alert button;
  const handleSetAlert = () => {
    navigate("/");
    notify();
  };
  return (
    <div className={style.button}>
      <button>Cancel</button>
      <button onClick={handleSetAlert}>Set Alert</button>
    </div>
  );
}
