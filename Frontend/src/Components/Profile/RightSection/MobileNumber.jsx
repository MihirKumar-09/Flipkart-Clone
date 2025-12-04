import style from "./MobileNumber.module.css";
import { useAuth } from "../../../Context/AuthContext";
export default function MobileNumber() {
  const { user } = useAuth();
  return (
    <div className={style.mobileNumber}>
      <h5>Mobile Number</h5>
      <input
        type="text"
        placeholder={user?.mobile || "Currently Unavailable!"}
      />
    </div>
  );
}
