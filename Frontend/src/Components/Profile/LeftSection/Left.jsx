import style from "./Left.module.css";
import ProfileHeader from "./ProfileHeader";
import OtherInfo from "./OtherInfo";

export default function Left() {
  return (
    <div className={style.left}>
      <ProfileHeader />
      <OtherInfo />
    </div>
  );
}
