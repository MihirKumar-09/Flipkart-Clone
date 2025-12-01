import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function FeatureProducts() {
  let [beatyProducts, setBeautyProducts] = useState([]);

  useEffect(() => {
    let fetchBeautyProducts = async () => {
      try {
        let res = await fetch(
          "http://localhost:8080/api/products/section?category=Beauty&limit=5&random=true"
        );
        let data = await res.json();
        setBeautyProducts(data);
      } catch (err) {
        console.log("Faild to fetch beauty products", err);
      }
    };
    fetchBeautyProducts();
  }, []);
  return (
    <div className="feature">
      <div className="feature-head">
        <h1>Featured Products</h1>
      </div>
      <div className="feature-items">
        {beatyProducts.length > 0 ? (
          beatyProducts.map((item) => (
            <Link to={`/product/${item._id}`} className="beauty-link">
              <div className="beauty-card" key={item._id}>
                <img src={item.image[0].url} alt={item.name} />
                <p className="title">{item.name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading Beauty Products</p>
        )}
      </div>
    </div>
  );
}
