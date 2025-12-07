import style from "./BuyNow.module.css";
import Address from "./Address/Address";
import TotalCost from "./TotalMoney/TotalMoney";
export default function BuyNow() {
  return (
    <div className={style.buyNow}>
      <Address />
      <TotalCost />
    </div>
  );
}
