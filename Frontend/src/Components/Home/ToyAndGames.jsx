import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SuggestItem() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/section?category=Toys&limit=8&random=true"
        );
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.log("Failed to fetch deals:", err);
      }
    };
    fetchToys();
  }, []);
  // Handle Toy and games
  const handleToyAndGames = () => {
    navigate("/product-list?search=Toys");
  };
  return (
    <div className="item-container">
      <div className="head" onClick={() => handleToyAndGames()}>
        <h4>Toys and Games</h4>
        <i className="fa-solid fa-circle-chevron-right"></i>
      </div>
      <div className="wrap-items">
        {games.length > 0 ? (
          games.map((item) => (
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
