import "./Products.css";
import SellingMobile from "../../assets/HomePage/SellingSmartPhone.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Fashions() {
  const [topFashion, setTopFashion] = useState([]);
  const navigate = useNavigate();

  // Fashion Top Deals
  useEffect(() => {
    const fetchTopFashion = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Men's Fashion,Women Fashion,SareeHub,Unisex Fashion,Beauty&limit=4&random=true`,
        );
        const data = await res.json();
        setTopFashion(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopFashion();
  }, []);

  // Handle Fashions Top Deals;
  const handleFashionTopDeals = () => {
    navigate("/product-list?search=Women|SareeHub|Unisex Fashion|Beauty");
  };

  return (
    <>
      <div className="topProducts">
        <div className="wrapProducts leftDiv">
          <div className="head" onClick={() => handleFashionTopDeals()}>
            <h4>Fashion's Top Deals</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="top-fashion-card">
            {topFashion.length > 0 ? (
              topFashion.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="rated-card-link"
                >
                  <div className="cards" key={item._id}>
                    <img
                      src={item.image[0].url}
                      alt={item.name}
                      className="topMobiles-img"
                    />
                    <p>{item.name}</p>
                    <span>50% Off</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>
        <div className="fashionNeeds rightDiv">
          <Link to="/product-list?search=Mobiles">
            <img src={SellingMobile} alt="Shop Your Fashion Nedds" />
          </Link>
        </div>
      </div>
    </>
  );
}
