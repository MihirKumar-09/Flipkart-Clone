import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Image from "./StockImage/Image";
import StockHead from "./StockHead/StockHead";
import Details from "./StockDetails/Details";
import style from "./stock.module.css";

export default function Stock() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className={style.stock}>
      <div className={style.stockContainer}>
        <StockHead product={product} />
        <div className={style.stockBody}>
          <div className={style.card}>
            <Image product={product} />
          </div>
          <div className={style.body}>
            <Details product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
