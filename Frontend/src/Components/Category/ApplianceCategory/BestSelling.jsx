import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function BestSelling() {
  let [showProducts, setShowProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        let res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Refrigerators,Tvs,Washing Machine,AirConditioners,Mixer Grinders&limi=20&random=true`,
        );
        let data = await res.json(res);
        setShowProducts(data);
      } catch (err) {
        console.log("Failed to fetch", err);
      }
    };
    fetchProducts();
  }, []);
  // Handle Best Selling Products;
  const handleBestSelling = () => {
    navigate(
      "/product-list?search=Refrigerators|Tvs|Washing|AirConditioners|Mixer Grinder",
    );
  };
  return (
    <div className="home-container">
      <div className="home-container-head">
        <h1>Best Selling</h1>
        <span>
          <i
            className="fa-regular fa-circle-right"
            style={{ color: "#2874F0" }}
            onClick={() => handleBestSelling()}
          ></i>
        </span>
      </div>
      <div className="home-container-item">
        {showProducts.length > 0 ? (
          showProducts.map((item) => (
            <Link to={`/product/${item._id}`} className="appliance-link">
              <div className="item-card appliance-card" key={item._id}>
                <img src={item.image[0].url} alt={item.name} />
                <p className="title">{item.name}</p>
                <span>
                  <p>₹{item.price.toLocaleString("en-IN")}</p>
                  <p className="rating">{item.rating} &#9733;</p>
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading top deals</p>
        )}
      </div>
    </div>
  );
}
