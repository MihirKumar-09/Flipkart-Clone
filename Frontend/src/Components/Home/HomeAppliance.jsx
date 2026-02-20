import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SuggestItem() {
  const [homeAppliance, setHomeAppliance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliance = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/section?category=Furniture,Tvs,Washing Machine,AirConditioners,Refrigerators,Mixer Grinders,Fans&limit=15&random=true`,
        );
        const data = await res.json();
        setHomeAppliance(data);
      } catch (err) {
        console.log("Failed to fetch deals:", err);
      }
    };
    fetchAppliance();
  }, []);
  // handle appliance click
  const handleAppliance = () => {
    navigate(
      `/product-list?search=Furniture|Tvs|Washing Machine|Air Conditioners|Refrigerators|Mixer Grinders|Fans`,
    );
  };
  return (
    <div className="item-container">
      <div className="head" onClick={() => handleAppliance()}>
        <h4>Top Deals On TVs & Appliances</h4>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
      <div className="wrap-items">
        {homeAppliance.length > 0 ? (
          homeAppliance.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="suggest-link"
            >
              <div
                className="suggest-card"
                key={item._id}
                style={{ border: "none" }}
              >
                <img
                  src={item.image[0].url}
                  alt={item.name}
                  className="suggest-img"
                />
                <p>{item.name}</p>
                <span>From ₹{item.price.toLocaleString("en-IN")}</span>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading top deals...</p>
        )}
      </div>
    </div>
  );
}
