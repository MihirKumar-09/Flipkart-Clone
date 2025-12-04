import style from "./PersonalInfo.module.css";
import { useAuth } from "../../../Context/AuthContext";
export default function PersonalInfo() {
  const { user } = useAuth();
  return (
    <div className={style.personalInfo}>
      <h5>Personal Information</h5>
      <input type="text" placeholder={user?.username} />
    </div>
  );
}
