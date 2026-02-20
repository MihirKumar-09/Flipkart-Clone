import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function TopCollections() {
  let [showTopCollections, setShowTopCollections] = useState([]);
  const navigate = useNavigate();

  // Fetch Top Collections from fashions;
  useEffect(() => {
    let fetchTopCollections = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/section?category=Men's Fashion,Women's CropTop,BodyConeDress,Women's Fashion,&limit=15&random=true`,
        );
        const data = await res.json();
        setShowTopCollections(data);
      } catch (err) {
        console.log("Failed to fetch Top Collections:", err);
      }
    };
    fetchTopCollections();
  }, []);

  // Handle Top Collection Dress;
  const handleTopCollectionDress = () => {
    navigate("/product-list?search=Fashion|CropTop|BodyConeDress");
  };
  return (
    <div className="top-collections">
      <div className="top-collections-heading">
        <h1>Top Collections</h1>
        <button onClick={() => handleTopCollectionDress()}>VIEW ALL</button>
      </div>

      <hr style={{ margin: "0px" }} />

      <div className="top-collections-items">
        {showTopCollections.length > 0 ? (
          showTopCollections.map((item) => (
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
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
