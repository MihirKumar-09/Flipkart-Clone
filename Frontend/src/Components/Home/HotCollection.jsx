import "./Products.css";
import FindFurniture from "../../assets/HomePage/findFurniture.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TrendingNow() {
  const [monsoon, setMonsoon] = useState([]);
  const [discount, setDiscount] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMonsoonItem = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/section?category=Unisex Fashion&limit=4&random=true"
        );
        const data = await res.json();
        setMonsoon(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonsoonItem();
  }, []);
  // Handle Fashions Top Deals;
  const handleFashionTopDeals = () => {
    navigate("/product-list?search=Unisex");
  };

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/section?category=Home-Decoration&limit=4&random=true"
        );
        const data = await res.json();
        setDiscount(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDiscountProducts();
  }, []);
  // Handle Discount for you;
  const handleDiscount = () => {
    navigate("/product-list?search=Home-Decoration");
  };
  return (
    <>
      <div className="topProducts">
        <div className="wrapProducts">
          <div className="head" onClick={() => handleFashionTopDeals()}>
            <h4>Handpicked For Monsoon</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="monsoon-card">
            {monsoon.length > 0 ? (
              monsoon.map((item) => (
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
                    <span>Top Offer</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>

        {/* Discount */}
        <div className="topRatedWrap">
          <div className="head" onClick={() => handleDiscount()}>
            <h4>Discount for you</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="discount-card">
            {discount.length > 0 ? (
              discount.map((item) => (
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
                    <span>Min. 50% Off</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>
        <div className="fashionNeeds">
          <Link to="/product-list?search=SofaSet|DiningTable|Furniture">
            <img src={FindFurniture} alt="Shop Your Fashion Nedds" />
          </Link>
        </div>
      </div>
    </>
  );
}
