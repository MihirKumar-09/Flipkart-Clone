import atta from "../../../assets/FlipkartMinutesImg/atta.jpg";
import egg from "../../../assets/FlipkartMinutesImg/egg.jpg";
import fruits from "../../../assets/FlipkartMinutesImg/fruits.jpg";
import meat from "../../../assets/FlipkartMinutesImg/meat.jpg";
import food from "../../../assets/FlipkartMinutesImg/food.jpg";
import vegitable from "../../../assets/FlipkartMinutesImg/vegitable.jpg";
import oil from "../../../assets/FlipkartMinutesImg/oil.jpg";

export default function Grocery() {
  return (
    <div className="products">
      <div className="head">
        <h1>Grocery</h1>
      </div>
      <div className="items">
        <div className="parent">
          <div className="div1">
            <img src={vegitable} alt="" />
          </div>
          <div className="div2">
            <img src={atta} alt="Atta & Rice" />
          </div>
          <div className="div3">
            <img src={oil} alt="oil & ghee" />
          </div>
          <div className="div4">
            <img src={egg} alt="egg & breads" />
          </div>
          <div className="div5">
            <img src={fruits} alt="dry fruits" />
          </div>
          <div className="div6">
            <img src={meat} alt="Fish & Chicken" />
          </div>
          <div className="div7">
            <img src={food} alt="Frozen Food" />
          </div>
        </div>
      </div>
    </div>
  );
}
