import style from "./PriceDrop.module.css";
import PriceDropHead from "./PriceDropHead/PriceDropHead";
import ImageContainer from "./ImageContainer/Image";
import Details from "./Details/Details";
import Button from "./Button/Button";
export default function PriceDrop() {
  return (
    <div className={style.PriceDrop}>
      <div className={style.PriceDropContainer}>
        <PriceDropHead />
        <div className={style.PriceDropBody}>
          <div className={style.imageContainer}>
            <ImageContainer />
          </div>
          <div className={style.detailsContainer}>
            <Details />
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}
