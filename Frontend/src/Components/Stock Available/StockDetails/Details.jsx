import style from "./Details.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;
  const id = product?._id;
  const notify = () => {
    toast.success("Alert Set Successfully", { autoClose: 3000, theme: "dark" });
  };
  const handleAlert = () => {
    navigate("/");
    notify();
  };
  return (
    <div className={style.detailsContainer}>
      <p className={style.notify}>Notify me when this item is back in stock</p>
      <div className={style.inputContainer}>
        <input type="email" placeholder="Email" />
        <input type="number" placeholder="Phone number(optional)" />
      </div>
      <div className={style.autoBuy}>
        <label className={style.checkContainer}>
          <input type="checkbox" />
          <span className={style.checkmark}></span>
          <p>Auto-Buy when back in stock</p>
        </label>
      </div>
      <div className={style.buttonContainer}>
        <button onClick={handleAlert}>Set Alert</button>
        <button onClick={() => navigate(`/product/${id}`)}>Cancel</button>
      </div>
    </div>
  );
}
