import style from "./StockHead.module.css";
export default function StockHead({ product }) {
  return (
    <div className={style.stockHead}>
      <h1>BACK IN STOCK!</h1>
    </div>
  );
}
