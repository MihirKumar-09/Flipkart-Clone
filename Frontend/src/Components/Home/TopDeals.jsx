import { useEffect, useState } from "react";
import "./TopDeals.css";
import FlightBooking from "../../assets/HomePage/flightBooking.webp";
import { Link } from "react-router-dom";

export default function TopDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Headphones,Unisex Fashion,DSLR Camera,New Beauty&limit=12`,
        );
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        console.log("Failed to fetch deals:", err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="Top-Deals-Category">
      <div className="top-deals">
        <div className="head">
          <h4>Top Deals</h4>
        </div>
        <div className="wrap-deals">
          {deals.length > 0 ? (
            deals.map((item) => (
              <div className="deal-card" key={item._id}>
                <Link
                  to={`/product/${item._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="link-style"
                >
                  <img
                    src={item.image[0].url}
                    alt={item.name}
                    className="topDeals-img"
                  />
                  <p>{item.name}</p>
                  <span>From ₹{item.price.toLocaleString("en-IN")}</span>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading top deals...</p>
          )}
        </div>
      </div>
      <div className="flightBooking">
        <img src={FlightBooking} alt="Booking Your Flight" />
      </div>
    </div>
  );
}
