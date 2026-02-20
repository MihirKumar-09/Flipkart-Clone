import { useState, useEffect } from "react";
import NewBanner from "../../../assets/BeautyCategory/newbanner.jpeg";
import { Link } from "react-router-dom";
export default function NewArrival() {
  let [beatyProducts, setBeautyProducts] = useState([]);

  useEffect(() => {
    let fetchBeautyProducts = async () => {
      try {
        let res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=New Beauty&limi=6`,
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
    <div className="new-arrival feature">
      <div className="new-arrival-head">
        <h1>New Arrival Products</h1>
      </div>
      <div className="new-arrival-item">
        <div className="box big">
          <img src={NewBanner} alt="Sponcer" />
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

        {beatyProducts.length > 0 ? (
          beatyProducts.map((item) => (
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
