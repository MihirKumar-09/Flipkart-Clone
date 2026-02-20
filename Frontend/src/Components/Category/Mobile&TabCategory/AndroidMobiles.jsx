import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../UI/ProductCard/ProductCard";
import { Link } from "react-router-dom";
export default function AndroidMobiles() {
  const [androidMobiles, setAndroidMobiles] = useState([]);
  const navigate = useNavigate();

  // Fetch Apple Mobiles;
  useEffect(() => {
    const fetchAndroid = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/section?category=Mobiles&brand=Samsung,Vivo,OPPO&limit=5&random=true`,
        );
        const data = await res.json();
        setAndroidMobiles(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAndroid();
  }, []);
  // handle android mobiles
  const handleAndroidMobiles = () => {
    navigate("/product-list?search=Samsung|Vivo|OPPO");
  };

  return (
    <div className="android-mobile">
      <div className="android-head" onClick={() => handleAndroidMobiles()}>
        <h3>Android Smartphones</h3>
        <button>VIEW ALL</button>
      </div>
      <hr style={{ margin: "0px" }} />

      <div className="wrap-items android-products">
        {androidMobiles.map((item) => (
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
