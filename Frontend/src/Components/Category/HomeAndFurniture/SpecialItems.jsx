import Sofa from "../../../assets/FurnitureCategory/sofa.png";
import Table from "../../../assets/FurnitureCategory/table.png";
import Lamp from "../../../assets/FurnitureCategory/lamp.png";
import { useNavigate } from "react-router-dom";
export default function SpecialItems() {
  const navigate = useNavigate();
  let categories = [
    {
      id: 1,
      title: "Sofa Set",
      subtitle: "Relax in Style",
      img: Sofa,
      color: "#325CBE",
      subColor: "#E1E8FF",
      textColor: "#FFFFFF",
      category: "SofaSet",
    },
    {
      id: 2,
      title: "Lamp",
      subtitle: "Highlight Home",
      img: Lamp,
      color: "#2C2E35",
      subColor: "#C9C9C9",
      textColor: "#F5F5F5",
      category: "LampLight",
    },
    {
      id: 3,
      title: "Dining Table",
      subtitle: "Dine Together",
      img: Table,
      color: "#2A7F7F",
      subColor: "#E3F8F8",
      textColor: "#ffffff",
      category: "DiningTable",
    },
  ];
  // handle special item click;
  const handleSpecialItem = (cat) => {
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
          <div className="home-card-text">
            <p style={{ color: item.subColor }}>{item.subtitle}</p>
            <h2 style={{ color: item.textColor }}>{item.title}</h2>
            <button onClick={() => handleSpecialItem(item.category)}>
              View All<i class="fa-solid fa-angles-right"></i>
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
