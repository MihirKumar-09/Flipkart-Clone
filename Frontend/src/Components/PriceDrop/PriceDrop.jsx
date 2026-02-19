import style from "./PriceDrop.module.css";
import PriceDropHead from "./PriceDropHead/PriceDropHead";
import ImageContainer from "./ImageContainer/Image";
import Details from "./Details/Details";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function PriceDrop() {
  const [targetPrice, setTargetPrice] = useState("");
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
    <div className={style.PriceDrop}>
      <div className={style.PriceDropContainer}>
        <PriceDropHead />
        <div className={style.PriceDropBody}>
          <div className={style.imageContainer}>
            <ImageContainer product={product} />
          </div>
          <div className={style.detailsContainer}>
            <Details product={product} setTargetPrice={setTargetPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
