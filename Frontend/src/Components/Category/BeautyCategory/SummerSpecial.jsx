import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function SummerSpecial() {
  let [summerSpecial, setSummerSpecial] = useState([]);

  useEffect(() => {
    let fetchSummerSpecial = async () => {
      try {
        let res = await fetch(
          "http://localhost:8080/api/products/section?category=Cold Drinks&limi=10&random=true"
        );
        let data = await res.json();
        setSummerSpecial(data);
      } catch (err) {
        console.log("Faild to fetch beauty products", err);
      }
    };
    fetchSummerSpecial();
  }, []);
  return (
    <div className="feature">
      <div className="feature-head">
        <h1>Summer Special's</h1>
      </div>
      <div className="feature-items">
        {summerSpecial.length > 0 ? (
          summerSpecial.map((item) => (
            <Link to={`/product/${item._id}`} className="beauty-link">
              <div className="beauty-card" key={item._id}>
                <img src={item.image[0].url} alt={item.name} />
                <p className="title">{item.name}</p>
                <p style={{ fontWeight: "bold", color: "black" }}>
                  ₹{item.price}
                </p>
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
