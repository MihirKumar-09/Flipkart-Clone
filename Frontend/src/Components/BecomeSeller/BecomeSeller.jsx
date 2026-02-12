import style from "./BecomeSeller.module.css";
import Home from "./HomePage/Home";
export default function BecomeSeller() {
  return (
    <div className={style.sellerContainer}>
      <Home />
    </div>
  );
}
