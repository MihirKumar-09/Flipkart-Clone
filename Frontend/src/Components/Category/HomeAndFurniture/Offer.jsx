import Statue from "../../../assets/FurnitureCategory/statue.png";
import Storage from "../../../assets/FurnitureCategory/storage.png";
import { useNavigate } from "react-router-dom";
export default function Offer() {
  const navigate = useNavigate();
  let categories = [
    {
      id: 4,
      title: "Divine Murti",
      subtitle: "Bring Serenity Home",
      img: Statue,
      color: "#D4AF37",
      subColor: "#3b3a3aff",
      textColor: "#2c2c2c",
      category: "Murti",
    },
    {
      id: 5,
      title: "Storage Cabinet",
      subtitle: "Organize with Elegance",
      img: Storage,
      color: "#2C2C54",
      subColor: "#E3F8F8",
      textColor: "#ffffff",
      category: "StorageCebinate",
    },
  ];

  // Handle Second Container;
  const handleCategory = (cat) => {
    navigate(`/product-list?search=${encodeURIComponent(cat)}`);
  };
  return (
    <div className="home-category-items">
      {categories.map((item) => (
        <div
          key={item.id}
          className="home-category-card"
          style={{ backgroundColor: item.color }}
        >
          <div className={`home-card-text home-card-text-${item.id}`}>
            <p style={{ color: item.subColor }}>{item.subtitle}</p>
            <h2 style={{ color: item.textColor }}>{item.title}</h2>
            <button onClick={() => handleCategory(item.category)}>
              View All<i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <div className={`home-card-img home-card-img-${item.id}`}>
            <img src={item.img} alt={item.title} />
          </div>
        </div>
      ))}
    </div>
  );
}
