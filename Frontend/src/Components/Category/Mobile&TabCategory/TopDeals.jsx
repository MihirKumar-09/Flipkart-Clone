import TopDealsMain from "../../../assets/MobileAndTabletsCategory/TopDeals.png";
import TopDeals1 from "../../../assets/MobileAndTabletsCategory/TopDeals1.png";
import TopDeals2 from "../../../assets/MobileAndTabletsCategory/TopDeals2.png";
import TopDeals3 from "../../../assets/MobileAndTabletsCategory/TopDeals3.png";
export default function TopDeals() {
  return (
    <div className="main">
      <div className="lunch-heading">
        <h1 className="style-head">Top Deals</h1>
      </div>

      <div className="top-deals-section">
        <div>
          <img src={TopDealsMain} alt="Vivo Tx4 5g" />
        </div>
        <div className="top-deals-section-two">
          <div>
            <img src={TopDeals1} alt="" />
          </div>
          <div>
            <img src={TopDeals2} alt="" />
          </div>
        </div>
        <div>
          <img src={TopDeals3} alt="Motorola edge 60 fusion" />
        </div>
      </div>
    </div>
  );
}
