import headphone from "../../../assets/ElectronicsCategory/headphone.png";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-image">
          <h1 className="hero-title">HEADPHONE</h1>
          <img src={headphone} alt="Headphone" />
        </div>
      </div>
      <div className="hero-buttons">
        <button>Buy Now</button>
        <button>Shop All</button>
      </div>
    </div>
  );
}
