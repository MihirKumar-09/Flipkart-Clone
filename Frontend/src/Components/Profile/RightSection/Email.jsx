import style from "./Email.module.css";
import { useAuth } from "../../../Context/AuthContext";
export default function Email() {
  const { user } = useAuth();
  return (
    <div className={style.email}>
      <h5>Email Address</h5>
      <input type="text" placeholder={user?.email} />
    </div>
  );
}
