import style from "./stock.module.css";
import StockHead from "./StockHead/StockHead";
import Image from "./StockImage/Image";
import Details from "./StockDetails/Details";
export default function Stock() {
  return (
    <div className={style.stock}>
      <div className={style.stockContainer}>
        <StockHead />
        <div className={style.stockBody}>
          <div className={style.card}>
            <Image />
          </div>
          <div className={style.body}>
            <Details />
          </div>
        </div>
      </div>
    </div>
  );
}
