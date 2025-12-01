import Premium1 from "../../../assets/MobileAndTabletsCategory/Premium1.png";
import Premium2 from "../../../assets/MobileAndTabletsCategory/Premium2.png";
import Premium3 from "../../../assets/MobileAndTabletsCategory/Premium3.png";
import Premium4 from "../../../assets/MobileAndTabletsCategory/Premium4.png";
import Premium5 from "../../../assets/MobileAndTabletsCategory/Premium5.png";
export default function PremiumPhone() {
  return (
    <div className="main">
      <div className="lunch-heading">
        <h1 className="style-head">Premium Smartphones</h1>
      </div>

      <div className="top-deals-section">
        <div>
          <img src={Premium1} alt="Vivo Tx4 5g" />
        </div>
        <div className="top-deals-section-two">
          <div>
            <img src={Premium2} alt="" />
          </div>
          <div>
            <img src={Premium3} alt="" />
          </div>
          <div>
            <img src={Premium4} alt="" />
          </div>
        </div>
        <div>
          <img src={Premium5} alt="Motorola edge 60 fusion" />
        </div>
      </div>
    </div>
  );
}
