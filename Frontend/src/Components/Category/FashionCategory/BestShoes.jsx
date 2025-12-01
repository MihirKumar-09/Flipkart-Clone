import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function BestShoes() {
  let [showBestShoes, setShowBestShoes] = useState([]);
  const navigate = useNavigate();

  // Fetch Men Collections from fashions;
  useEffect(() => {
    let fetchBestShoes = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/section?category=Men's Shoes,Women's Shoes&limit=15&random=true"
        );
        const data = await res.json();
        setShowBestShoes(data);
      } catch (err) {
        console.log("Failed to fetch Top Collections:", err);
      }
    };
    fetchBestShoes();
  }, []);
  // Handle Shoes;
  const handleShoes = () => {
    navigate("/product-list?search=Shoes");
  };
  return (
    <div className="top-collections">
      <div className="top-collections-heading">
        <h1>Footwear Collection</h1>
        <button onClick={() => handleShoes()}>VIEW ALL</button>
      </div>

      <hr style={{ margin: "0px" }} />

      <div className="top-collections-items wrap-items">
        {showBestShoes.length > 0 ? (
          showBestShoes.map((item) => (
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
