import NewOppo from "../../../assets/MobileAndTabletsCategory/NewOppo.png";
import NewRelme from "../../../assets/MobileAndTabletsCategory/NewRealme.png";
import NewMoto from "../../../assets/MobileAndTabletsCategory/NewMoto.png";
export default function UpcomingLunch() {
  return (
    <div className="main">
      <div className="lunch-heading">
        <h1 className="style-head">Upcoming Launch</h1>
      </div>
      <div className="section">
        <div>
          <img src={NewRelme} alt="Oppo x9 series" />
        </div>
        <div>
          <img src={NewOppo} alt="Realme GT 8 Pro" />
        </div>
        <div>
          <img src={NewMoto} alt="moto g67 POWER" />
        </div>
      </div>
    </div>
  );
}
