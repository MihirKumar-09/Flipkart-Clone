import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function WomenFashions() {
  let [showWomenCollections, setShowWomenCollections] = useState([]);
  const navigate = useNavigate();

  // Fetch Men Collections from fashions;
  useEffect(() => {
    let fetchWomenCollections = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/section?category=Women's Fashion,Women's Shoes,Women's CropTop,BodyConeDress,Jewelry,Bra's&limit=15&random=true`,
        );
        const data = await res.json();
        setShowWomenCollections(data);
      } catch (err) {
        console.log("Failed to fetch Top Collections:", err);
      }
    };
    fetchWomenCollections();
  }, []);
  // Handle Women Fashion;
  const handleWomenFashion = () => {
    navigate("/product-list?search=Women's|CropTop|BodyConeDress");
  };
  return (
    <div className="top-collections">
      <div className="top-collections-heading">
        <h1>Women’s Fashion Edit</h1>
        <button onClick={() => handleWomenFashion()}>VIEW ALL</button>
      </div>

      <hr style={{ margin: "0px" }} />

      <div className="top-collections-items wrap-items">
        {showWomenCollections.length > 0 ? (
          showWomenCollections.map((item) => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              className="flipkart-link"
            >
              <div className="flipkart-card">
                <img
                  src={item.image[0].url}
                  alt={item.name}
                  className="flipkart-img"
                />
                <p className="flipkart-title">{item.name}</p>
                <div className="flipkart-price-rating">
                  <p className="flipkart-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <p className="flipkart-rating">{item.rating} ★</p>
                </div>
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
