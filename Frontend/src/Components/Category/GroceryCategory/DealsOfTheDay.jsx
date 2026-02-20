import style from "./DealsOfTheDay.module.css";
import ProductCard from "../../UI/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function DealsOfTheDay() {
  let [groceryProducts, setGroceryProducts] = useState([]);

  useEffect(() => {
    let fetchGroceryProducts = async () => {
      try {
        let res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/products/section?category=Grocery,Food&limit=8&random=true`,
        );
        let data = await res.json();
        setGroceryProducts(data);
      } catch (err) {
        console.log("Faild to fetch beauty products", err);
      }
    };
    fetchGroceryProducts();
  }, []);
  // Handle Grocery Products;
  const navigate = useNavigate();
  const handleGroceryProducts = () => {
    navigate("/product-list?search=Grocery|Food");
  };
  //
  return (
    <div className={style.dealsGrocery}>
      <div className={style.head}>
        <h1>Deals of the Day</h1>
        <button onClick={() => handleGroceryProducts()}>VIEW ALL</button>
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
