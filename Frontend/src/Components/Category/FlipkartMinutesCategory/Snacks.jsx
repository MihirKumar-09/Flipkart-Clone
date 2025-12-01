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
        <div class="parent">
          <div class="div1">
            <img src={Snacks} alt="" />
          </div>
          <div class="div2">
            <img src={IceCream} alt="Atta & Rice" />
          </div>
          <div class="div3">
            <img src={Drinks} alt="oil & ghee" />
          </div>
          <div class="div4">
            <img src={Chocolates} alt="egg & breads" />
          </div>
          <div class="div5">
            <img src={Coffee} alt="dry fruits" />
          </div>
          <div class="div6">
            <img src={Bakery} alt="Fish & Chicken" />
          </div>
          <div class="div7">
            <img src={Sauces} alt="Frozen Food" />
          </div>
        </div>
      </div>
    </div>
  );
}
