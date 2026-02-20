import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function MenFashions() {
  let [showMenCollections, setShowMenCollections] = useState([]);
  const navigate = useNavigate();

  // Fetch Men Collections from fashions;
  useEffect(() => {
    let fetchMenCollections = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Men's Fashion,Men's Shoes&limit=15&random=true`,
        );
        const data = await res.json();
        setShowMenCollections(data);
      } catch (err) {
        console.log("Failed to fetch Top Collections:", err);
      }
    };
    fetchMenCollections();
  }, []);
  // Handle Men Fashion;
  const handleMenFashion = () => {
    navigate("/product-list?search=Men's Fashion");
  };
  return (
    <div className="top-collections">
      <div className="top-collections-heading">
        <h1>Gent’s Collective</h1>
        <button onClick={() => handleMenFashion()}>VIEW ALL</button>
      </div>

      <hr style={{ margin: "0px" }} />

      <div className="top-collections-items wrap-items">
        {showMenCollections.length > 0 ? (
          showMenCollections.map((item) => (
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
