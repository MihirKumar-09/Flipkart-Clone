import style from "./ProfilePage.module.css";
import Left from "../../Components/Profile/LeftSection/Left";
import Right from "../../Components/Profile/RightSection/Right";
export default function Profile() {
  return (
    <div className={style.profile}>
      <Left />
      <Right />
    </div>
  );
}
