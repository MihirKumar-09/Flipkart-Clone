import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SuggestItem() {
  const [suggested, setSuggested] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestItem = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Tvs,Washing Machine,Refrigerators,Mobiles&limit=12`,
        );
        const data = await res.json();
        setSuggested(data);
      } catch (err) {
        console.log("Failed to fetch deals:", err);
      }
    };
    fetchSuggestItem();
  }, []);

  // handle suggest item click
  const handleSuggestItem = () => {
    navigate(`/product-list?search=Mobiles|Tvs`);
  };
  return (
    <div className="item-container">
      <div className="head" onClick={() => handleSuggestItem()}>
        <h4>Suggested for You</h4>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
      <div className="wrap-items">
        {suggested.length > 0 ? (
          suggested.map((item) => (
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
