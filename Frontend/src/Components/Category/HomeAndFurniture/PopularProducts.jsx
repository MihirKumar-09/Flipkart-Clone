import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function PopularPorducts() {
  let [showProducts, setShowProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        let res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/section?category=Furniture,Home-Decoration&limit=6&random=true`,
        );
        let data = await res.json(res);
        setShowProducts(data);
      } catch (err) {
        console.log("Failed to fetch", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle Popular Product;
  const handlePopularProduct = () => {
    navigate("/product-list?search=Furniture|Home-Decoration");
  };
  return (
    <div className="home-container">
      <div className="home-container-head">
        <h1>Popular Products</h1>
        <span onClick={() => handlePopularProduct()}>
          <p>View All Products</p>
          <i className="fa-solid fa-arrow-right-long"></i>
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
