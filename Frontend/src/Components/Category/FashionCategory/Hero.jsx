import MainHero from "../../../assets/FashionCategory/mainhero.png";
import Bank from "../../../assets/FashionCategory/banklogo.png";
import SecondHero1 from "../../../assets/FashionCategory/secondhero1.png";
import SecondHero2 from "../../../assets/FashionCategory/secondhero2.png";
import SecondHero3 from "../../../assets/FashionCategory/secondhero3.png";
export default function Hero() {
  return (
    <div className="fashion-hero-section">
      <h1>Fashion Collective</h1>
      <div className="main-hero-section">
        <div className="main-hero">
          <img src={MainHero} alt="Hero" />
        </div>
        <div className="bank-logo">
          <img src={Bank} alt="Bank Logo" />
        </div>
      </div>
      <div className="second-hero-section">
        <div>
          <img src={SecondHero1} alt="Fan" />
        </div>
        <div>
          <img src={SecondHero2} alt="Mixer" />
        </div>
        <div>
          <img src={SecondHero3} alt="Water Purifier" />
        </div>
      </div>
    </div>
  );
}
