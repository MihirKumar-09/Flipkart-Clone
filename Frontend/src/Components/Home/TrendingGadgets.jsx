import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LifeStyle() {
  const [trendingGadgets, setTrendingGadgets] = useState([]);
  const [bodyCare, setBodyCare] = useState([]);
  const [womenFashion, setWomenFashion] = useState([]);
  const navigate = useNavigate();

  // Trednign Gadgets
  useEffect(() => {
    const fetchTrendingGadgets = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Nackbands,Earbuds,Men Trimmers,Women Trimmers&limit=4&random=true`,
        );
        const data = await res.json();
        setTrendingGadgets(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTrendingGadgets();
  }, []);

  // handle trending gadgets
  const handleTrendingGadgets = () => {
    navigate("/product-list?search=Earbuds|Nackbands|Trimmers");
  };
  // Body Care
  useEffect(() => {
    const fetchBodyCare = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Skin Care,Hair Care&limit=4&random=true`,
        );
        const data = await res.json();
        setBodyCare(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBodyCare();
  }, []);

  // Handle Body Cate Items;
  const handleBodyCare = () => {
    navigate("/product-list?search=Skin Care|Hair Care");
  };
  // Shoes;
  useEffect(() => {
    const fetchWomenFashion = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Men's Shoes,Women's Shoes&limit=4&random=true`,
        );
        const data = await res.json();
        setWomenFashion(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWomenFashion();
  }, []);

  // Handle Kick of the day
  const handleKickOfTheDay = () => {
    navigate("/product-list?search=Shoes");
  };

  return (
    <>
      <div className="topProducts">
        <div className="topSectionWrap">
          <div className="head" onClick={() => handleTrendingGadgets()}>
            <h4>Trending Gadgets & Appliances</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="gadgets-card">
            {trendingGadgets.length > 0 ? (
              trendingGadgets.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="link-style"
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

        {/* Body Care */}
        <div className="topRatedWrap">
          <div className="head" onClick={() => handleBodyCare()}>
            <h4>Hair & Skincare Essentials</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="body-care-card">
            {bodyCare.length > 0 ? (
              bodyCare.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="link-style"
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
          <div className="head" onClick={() => handleKickOfTheDay()}>
            <h4>Kick of the Day</h4>
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
