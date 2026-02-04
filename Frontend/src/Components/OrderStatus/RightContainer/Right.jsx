import style from "./Right.module.css";
import UserDetails from "./UserDetails/UserDetails";
import PriceDetails from "./PriceDetails/PriceDetails";
export default function RightContainer({ order }) {
  return (
    <div className={style.right}>
      <UserDetails order={order} />
      <PriceDetails order={order} />
    </div>
  );
}
