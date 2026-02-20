import "./Products.css";
import FashionNeeds from "../../assets/HomePage/fashionNeeds.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TrendingNow() {
  const [topMobiles, setTopMobiles] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopMobiles = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Mobiles&limit=4&random=true`,
        );
        const data = await res.json();
        setTopMobiles(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopMobiles();
  }, []);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Laptops,Men's Fashion,Sports&limit=4&random=true`,
        );
        const data = await res.json();
        setTopRated(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopRated();
  }, []);

  // Top Mobiles ;
  const handleTopMobiles = () => {
    navigate(`/product-list?search=Mobiles`);
  };

  // Top Rated
  const handleTopRated = () => {
    navigate(`/product-list?search=Laptops|Men's Fashion|Sports`);
  };
  return (
    <>
      <div className="topProducts">
        <div className="wrapProducts">
          <div className="head" onClick={() => handleTopMobiles()}>
            <h4>Top Mobiles</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="mobile-card">
            {topMobiles.length > 0 &&
              topMobiles.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="rated-card-link"
                >
                  <div className="cards">
                    <img
                      src={item.image[0].url}
                      alt={item.name}
                      className="topMobiles-img"
                    />
                    <p>{item.name}</p>
                    <span>Top Offer</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="topRatedWrap">
          <div className="head" onClick={() => handleTopRated()}>
            <h4>Top Rated</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="rated-card">
            {topRated.length > 0 ? (
              topRated.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="rated-card-link"
                >
                  <div className="cards">
                    <img
                      src={item.image[0].url}
                      alt={item.name}
                      className="topMobiles-img"
                    />
                    <p>{item.name}</p>
                    <span>Top Rated Items</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>
        <div className="fashionNeeds">
          <Link to="/product-list?search=SareeHub|Fashion|BodyConeDress|CropTop|Shoes">
            <img src={FashionNeeds} alt="Shop Your Fashion Nedds" />
          </Link>
        </div>
      </div>
    </>
  );
}
