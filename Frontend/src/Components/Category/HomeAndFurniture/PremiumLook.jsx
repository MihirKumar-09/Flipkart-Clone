import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function premiumLook() {
  let [showProducts, setShowProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        let res = await fetch(
          "http://localhost:8080/api/products/section?category=Furniture,SofaSet&limit=10&random=true"
        );
        let data = await res.json(res);
        setShowProducts(data);
      } catch (err) {
        console.log("Failed to fetch", err);
      }
    };
    fetchProducts();
  }, []);
  // handle view all products
  const handlePremiumProducts = () => {
    navigate("/product-list?search=Furniture|SofaSet");
  };
  return (
    <div className="home-container">
      <div className="home-container-head">
        <h1>Premium Look</h1>
        <span onClick={() => handlePremiumProducts()}>
          <p>View All Products</p>
          <i class="fa-solid fa-arrow-right-long"></i>
        </span>
      </div>
      <hr style={{ margin: "0px" }} />
      <div className="home-container-item">
        {showProducts.length > 0 ? (
          showProducts.map((item, i) => (
            <Link to={`/product/${item._id}`} className="electronics-link">
              <div className="item-card" key={item._id}>
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
