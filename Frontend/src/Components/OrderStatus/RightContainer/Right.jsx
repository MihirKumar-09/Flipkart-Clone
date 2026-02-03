import style from "./Right.module.css";
import UserDetails from "./UserDetails/UserDetails";
import PriceDetails from "./PriceDetails/PriceDetails";
export default function RightContainer() {
  return (
    <div className={style.right}>
      <UserDetails />
      <PriceDetails />
    </div>
  );
}
