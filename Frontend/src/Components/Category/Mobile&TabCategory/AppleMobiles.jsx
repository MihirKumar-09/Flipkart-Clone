import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../UI/ProductCard/ProductCard";
import { Link } from "react-router-dom";
export default function AppleMobile() {
  const [appleMobiles, setAppleMobiles] = useState([]);
  const navigate = useNavigate();

  // Fetch Apple Mobiles;
  useEffect(() => {
    const fetchAppleMobiles = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/section?category=Mobiles&brand=Apple&limit=10&random=true"
        );
        const data = await res.json();
        console.log("Apple products fetched:", data);
        setAppleMobiles(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppleMobiles();
  }, []);
  // Handle Apple Mobiles;
  const handleAppleMobiles = () => {
    navigate("/product-list?search=Apple");
  };
  return (
    <div className="apple-mobile">
      <div className="apple-head">
        <h3>Apple Smartphones</h3>
        <button onClick={() => handleAppleMobiles()}>VIEW ALL</button>
      </div>
      <hr style={{ margin: "0px" }} />

      <div className="wrap-items apple-products">
        {appleMobiles.map((item) => (
          <Link
            to={`/product/${item._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ProductCard
              key={item._id}
              image={item.image[0].url}
              title={item.name}
              price={item.price}
              rating={item.rating}
              stock={item.stock}
              noBorder={true}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
