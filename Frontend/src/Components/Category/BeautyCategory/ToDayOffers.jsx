import { useState, useEffect } from "react";
import ToDayBanner from "../../../assets/BeautyCategory/todaybanner.jpg";
import { Link } from "react-router-dom";
export default function ToDayOffers() {
  let [foodProducts, setFoodProducts] = useState([]);

  useEffect(() => {
    let fetchFoodProducts = async () => {
      try {
        let res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Cold Drinks,Food&limit=6`,
        );
        let data = await res.json();
        setFoodProducts(data);
      } catch (err) {
        console.log("Faild to fetch beauty products", err);
      }
    };
    fetchFoodProducts();
  }, []);
  return (
    <div className="new-arrival feature">
      <div className="new-arrival-head">
        <h1>New Arrival Products</h1>
      </div>
      <div className="new-arrival-item">
        <div className="box big">
          <img src={ToDayBanner} alt="Sponcer" />
          <div className="overlay">
            <div className="bottom-text">
              <h6>50% Off</h6>
              <p>10 JAN - 28 JAN</p>
              <a href="#">
                <p>SHOP NOW</p>
              </a>
            </div>
          </div>
        </div>

        {foodProducts.length > 0 ? (
          foodProducts.map((item) => (
            <Link to={`/product/${item._id}`} className="beauty-link">
              <div className="beauty-card box" key={item._id}>
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
