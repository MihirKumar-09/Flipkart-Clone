import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Kitchen() {
  let [showProducts, setShowProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        let res = await fetch(
          "http://localhost:8080/api/products/section?category=Water Purifiers,Microwave Ovens,Mixer Grinders&limi=6&random=true"
        );
        let data = await res.json(res);
        setShowProducts(data);
      } catch (err) {
        console.log("Failed to fetch", err);
      }
    };
    fetchProducts();
  }, []);
  // Handle Kitchen Products;
  const handleKitchen = () => {
    navigate(
      "/product-list?search=Water Purifiers|Microwave Ovens|Mixer Grinders"
    );
  };
  return (
    <div className="home-container">
      <div className="home-container-head">
        <h1>Best Kitchen</h1>
        <span>
          <i
            class="fa-regular fa-circle-right"
            style={{ color: "#2874F0" }}
            onClick={() => handleKitchen()}
          ></i>
        </span>
      </div>
      <div className="home-container-item">
        {showProducts.length > 0 ? (
          showProducts.map((item, i) => (
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
