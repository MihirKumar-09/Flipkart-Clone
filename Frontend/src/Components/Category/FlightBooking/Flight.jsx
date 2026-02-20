import style from "./Flight.module.css";
import { useNavigate } from "react-router-dom";
export default function Flight() {
  const navigate = useNavigate();

  return (
    <div className={style.flight}>
      <h1>Currently Unavailable Service</h1>
      <button onClick={() => navigate("/")}>
        <i className="fa-solid fa-arrow-left"></i>
        <span>Go Back</span>
      </button>
    </div>
  );
}
