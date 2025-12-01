import HeroImg from "../../../assets/ApplianceCategory/hero.png";
export default function Hero() {
  return (
    <div className="appliance-hero">
      <div className="appliance-container">
        <div className="appliance-image">
          <h1 className="appliance-title">SONY EXP1</h1>
          <img src={HeroImg} alt="Headphone" />
        </div>
      </div>
      <div className="appliance-buttons">
        <button>Buy Now</button>
        <button>Shop All</button>
      </div>
    </div>
  );
}
