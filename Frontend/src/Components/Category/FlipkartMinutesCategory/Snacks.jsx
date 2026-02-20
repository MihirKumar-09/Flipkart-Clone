import Snacks from "../../../assets/FlipkartMinutesImg/Snacks.jpg";
import IceCream from "../../../assets/FlipkartMinutesImg/IceCream.jpg";
import Drinks from "../../../assets/FlipkartMinutesImg/Drinks.jpg";
import Chocolates from "../../../assets/FlipkartMinutesImg/Chocolates.jpg";
import Coffee from "../../../assets/FlipkartMinutesImg/Coffee.jpg";
import Bakery from "../../../assets/FlipkartMinutesImg/Bakery.jpg";
import Sauces from "../../../assets/FlipkartMinutesImg/Sauces.jpg";

export default function Grocery() {
  return (
    <div className="products">
      <div className="head">
        <h1>Snacks & Drinks</h1>
      </div>
      <div className="items">
        <div className="parent">
          <div className="div1">
            <img src={Snacks} alt="" />
          </div>
          <div className="div2">
            <img src={IceCream} alt="Atta & Rice" />
          </div>
          <div className="div3">
            <img src={Drinks} alt="oil & ghee" />
          </div>
          <div className="div4">
            <img src={Chocolates} alt="egg & breads" />
          </div>
          <div className="div5">
            <img src={Coffee} alt="dry fruits" />
          </div>
          <div className="div6">
            <img src={Bakery} alt="Fish & Chicken" />
          </div>
          <div className="div7">
            <img src={Sauces} alt="Frozen Food" />
          </div>
        </div>
      </div>
    </div>
  );
}
