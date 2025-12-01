import Sprite from "../../../assets/BeautyCategory/sprite.png";
import Chips from "../../../assets/BeautyCategory/chips.png";
import Snaks from "../../../assets/BeautyCategory/snaks.png";
export default function FoodSell() {
  return (
    <div className="food-sell">
      <div className="food-sell-items">
        <div className="box large">
          <div>
            <p>Coldy</p>
            <h1>FRESH YOUR MOOD & BODY</h1>
            <p>Sale 20% every Monday</p>
            <button>Shop Now</button>
          </div>
          <img src={Sprite} alt="Sprite" />
        </div>
        <div className="box md-large">
          <div>
            <h1>CHIIL WITH SPRITE</h1>
            <p>Sale every Saturday</p>
            <button>Shop Now</button>
          </div>
          <img src={Chips} alt="Sprite" />
        </div>
        <div className="box md-large">
          <div>
            <h1>COOKIES</h1>
            <p>Sale every Sunday</p>
            <button>Shop Now</button>
          </div>
          <img src={Snaks} alt="Sprite" />
        </div>
      </div>
    </div>
  );
}
