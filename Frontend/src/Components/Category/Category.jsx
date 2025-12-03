import "./Category.css";

import Minutes from "../../assets/HomePage/flipkartMinutes.png";
import Mobile from "../../assets/HomePage/mobile.png";
import Fashion from "../../assets/HomePage/fashion.png";
import Electronics from "../../assets/HomePage/electronics.png";
import Furniture from "../../assets/HomePage/furniture.png";
import Tv from "../../assets/HomePage/tv.png";
import Flight from "../../assets/HomePage/flight.png";
import Teddy from "../../assets/HomePage/teddy.png";
import Grocery from "../../assets/HomePage/grocery.png";
import { Link } from "react-router-dom";
export default function Category() {
  return (
    <div className="category">
      <div className="category-wrapper">
        <Link to="/flipkart-minutes" className="link">
          <div className="category-item">
            <img src={Minutes} alt="" />
            <span>Minutes</span>
          </div>
        </Link>
        <Link to="/mobile-tablets" className="link">
          <div className="category-item">
            <img src={Mobile} alt="" />
            <span>Mobiles & Tablets</span>
          </div>
        </Link>
        <Link to="/fashion" className="link">
          <div className="category-item">
            <img src={Fashion} alt="" />
            <span>Fashion</span>
          </div>
        </Link>
        <Link to="/electronics" className="link">
          <div className="category-item">
            <img src={Electronics} alt="" />
            <span>Electronics</span>
          </div>
        </Link>

        <Link to="/home-furniture" className="link">
          <div className="category-item">
            <img src={Furniture} alt="" />
            <span>Home & Furniture</span>
          </div>
        </Link>

        <Link to="/appliance" className="link">
          <div className="category-item">
            <img src={Tv} alt="" />
            <span>TVs & Appliances</span>
          </div>
        </Link>

        <Link to="/flight" className="link">
          <div className="category-item">
            <img src={Flight} alt="" />
            <span>Flight Bookings</span>
          </div>
        </Link>
        <Link to="/beauty" className="link">
          <div className="category-item">
            <img src={Teddy} alt="" />
            <span>Beauty, Food..</span>
          </div>
        </Link>
        <Link to="/grocery" className="link">
          <div className="category-item">
            <img src={Grocery} alt="" />
            <span>Grocery</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
