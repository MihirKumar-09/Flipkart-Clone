import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LifeStyle() {
  const [topSection, setTopSection] = useState([]);
  const [homeStyle, setHomeStyle] = useState([]);
  const [womenFashion, setWomenFashion] = useState([]);
  const navigate = useNavigate();

  // Top Section
  useEffect(() => {
    const fetchTopSection = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Furniture,Laptops,Fitness&limit=4&random=true`,
        );
        const data = await res.json();
        setTopSection(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopSection();
  }, []);
  // Home Stylish;
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Home-Decoration&limit=4&random=true`,
        );
        const data = await res.json();
        setHomeStyle(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHomeProducts();
  }, []);
  // Women fashion;
  useEffect(() => {
    const fetchWomenFashion = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Women's Fashion,BodyConeDress&limit=4&random=true`,
        );
        const data = await res.json();
        setWomenFashion(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWomenFashion();
  }, []);

  // Handle Top Section;
  const handleTopSection = () => {
    navigate("/product-list?search=Laptops|Furniture|Fitness");
  };

  // Handle Home Stylish;
  const handleHomeStyle = () => {
    navigate("/product-list?search=Home-Decoration");
  };

  // Handle Women Fashion;
  const handleWomenFashion = () => {
    navigate("/product-list?search=BodyConeDress|Women's Fashion");
  };

  return (
    <>
      <div className="topProducts">
        <div className="topSectionWrap">
          <div className="head" onClick={() => handleTopSection()}>
            <h4>Top Section</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="top-section-card">
            {topSection.length > 0 ? (
              topSection.map((item) => (
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
                    <span>Top Collection</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>

        {/* Make Your Home Stylish */}
        <div className="topRatedWrap">
          <div className="head" onClick={() => handleHomeStyle()}>
            <h4>Make your home stylish</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="home-card">
            {homeStyle.length > 0 ? (
              homeStyle.map((item) => (
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
                    <span>Trending</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>

        {/* Women Fashion */}
        <div className="topRatedWrap">
          <div className="head" onClick={() => handleWomenFashion()}>
            <h4>Women Fashion's</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="women-fashion">
            {womenFashion.length > 0 ? (
              womenFashion.map((item) => (
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
                    <span>Grab Now</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
