import style from "./DealsOfTheDay.module.css";
import ProductCard from "../../UI/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function NewLaunch() {
  let [groceryProducts, setGroceryProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchGroceryProducts = async () => {
      try {
        let res = await fetch(
          "http://localhost:8080/api/products/section?category=Food&limit=8"
        );
        let data = await res.json();
        setGroceryProducts(data);
      } catch (err) {
        console.log("Faild to fetch beauty products", err);
      }
    };
    fetchGroceryProducts();
  }, []);
  // Handle New Launches
  const handleNewLaunches = () => {
    navigate("/product-list?search=Food");
  };
  return (
    <div className={style.dealsGrocery} style={{ backgroundColor: "#FCFFC1" }}>
      <div className={style.head}>
        <h1>New Launches</h1>
        <button onClick={() => handleNewLaunches()}>VIEW ALL</button>
      </div>
      <div className={style.dealsGroceryContainer}>
        {groceryProducts.map((item) => (
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
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
