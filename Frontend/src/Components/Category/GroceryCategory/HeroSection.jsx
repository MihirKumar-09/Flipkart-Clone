import style from "./Hero.module.css";
import HeroBanner from "../../../assets/GroceryCategory/hero.png";
export default function Hero() {
  return (
    <div className={style.hero}>
      <img src={HeroBanner} alt="" />
    </div>
  );
}
