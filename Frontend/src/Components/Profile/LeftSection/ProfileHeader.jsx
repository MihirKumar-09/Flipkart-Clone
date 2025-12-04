import style from "./ProfileHeader.module.css";
import pic from "../../../assets/ProfilePic/profilepic.jpg";
import { useAuth } from "../../../Context/AuthContext";
export default function ProfileHeader() {
  const { user } = useAuth();
  return (
    <div className={style.profileHeader}>
      <div className={style.image}>
        <img src={pic} alt="Profile Picture" />
      </div>
      <div className={style.otherInfo}>
        <p>Hello,</p>
        <h6>{user?.username || "Guest"}</h6>
      </div>
    </div>
  );
}
