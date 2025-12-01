import "./Products.css";
import Adventure from "../../assets/HomePage/adventure.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Fashions() {
  const [adventure, setAdventure] = useState([]);
  const navigate = useNavigate();

  // Fashion Top Deals
  useEffect(() => {
    const fetchAdventureItem = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/section?category=Adventure,DSLR Camera&limit=4&random=true"
        );
        const data = await res.json();
        setAdventure(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdventureItem();
  }, []);

  // handle adventure
  const handleAdventure = () => {
    navigate("/product-list?search=Adventure|DSLR Camera");
  };

  return (
    <>
      <div className="topProducts">
        <div className="wrapProducts leftDiv">
          <div className="head" onClick={() => handleAdventure()}>
            <h4>Adventure's</h4>
            <span>
              <i className="fa-solid fa-circle-chevron-right"></i>
            </span>
          </div>
          <div className="adventure-card">
            {adventure.length > 0 ? (
              adventure.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="rated-card-link"
                >
                  <div className="cards" key={item._id}>
                    <img
                      src={item.image[0].url}
                      alt={item.name}
                      className="topMobiles-img"
                    />
                    <p>{item.name}</p>
                    <span>50% Off</span>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading top deals...</p>
            )}
          </div>
        </div>
        <div className="fashionNeeds rightDiv">
          <img src={Adventure} alt="Shop Your Fashion Nedds" />
        </div>
      </div>
    </>
  );
}
