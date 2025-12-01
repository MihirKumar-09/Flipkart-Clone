import Card1 from "../../../assets/ElectronicsCategory/card1.png";
import Card2 from "../../../assets/ElectronicsCategory/card2.png";
import Card3 from "../../../assets/ElectronicsCategory/card3.png";
import Card4 from "../../../assets/ElectronicsCategory/card4.png";
import Card5 from "../../../assets/ElectronicsCategory/card5.png";
import Card6 from "../../../assets/ElectronicsCategory/card6.png";
import Card7 from "../../../assets/ElectronicsCategory/card7.png";
import Card8 from "../../../assets/ElectronicsCategory/card8.png";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);
export default function Container() {
  const navigate = useNavigate();
  const boxesRef = useRef([]);
  const categories = [
    {
      id: 1,
      title: "Earphone",
      subtitle: "Enjoy With",
      img: Card1,
      color: "#1a1a1a",
      textColor: "#ffffff",
      category: "Headphones|Earbuds|Nackbands",
    },
    {
      id: 2,
      title: "Keyboard",
      subtitle: "New Wear",
      img: Card2,
      color: "#ffcc00",
      textColor: "#000000",
      category: "Keyboard",
    },
    {
      id: 3,
      title: "Laptop",
      subtitle: "Trend Devices",
      img: Card3,
      color: "#ff3b30",
      textColor: "#ffffff",
      category: "Laptops",
    },
    {
      id: 4,
      title: "Smartwatch",
      subtitle: "Smart Picks",
      img: Card4,
      color: "#34c759",
      textColor: "#ffffff",
      category: "Smart Watch",
    },
    {
      id: 5,
      title: "Console",
      subtitle: "Best Gaming",
      img: Card5,
      color: "#ff2d55",
      textColor: "#ffffff",
      category: "Console",
    },
    {
      id: 6,
      title: "Oculus",
      subtitle: "Play Game",
      img: Card6,
      color: "#00c47a",
      textColor: "#ffffff",
      category: "Oculus",
    },
    {
      id: 7,
      title: "Speaker",
      subtitle: "New Amazon",
      img: Card7,
      color: "#ff9500",
      textColor: "#000000",
      category: "SoundSpeaker",
    },
    {
      id: 8,
      title: "Mouse",
      subtitle: "Amazon India",
      img: Card8,
      color: "#5856d6",
      textColor: "#ffffff",
      category: "Mouse",
    },
  ];

  useEffect(() => {
    if (!boxesRef.current.length) return;

    boxesRef.current.forEach((box) => {
      if (!box) return;
      gsap.fromTo(
        box,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  // Handle category click
  const handleBrowse = (cat) => {
    navigate(`/product-list?search=${encodeURIComponent(cat)}`);
  };
  return (
    <div className="category-grid">
      {categories.map((item, i) => (
        <div
          key={item.id}
          className={`category-card card-${item.id}`}
          style={{ backgroundColor: item.color }}
          ref={(el) => {
            if (el) boxesRef.current[i] = el;
          }}
        >
          <div className="card-text">
            <p style={{ color: item.textColor }}>{item.subtitle}</p>
            <h2 style={{ color: item.textColor }}>{item.title}</h2>
            <button onClick={() => handleBrowse(item.category)}>Browse</button>
          </div>
          <div className="card-img">
            <img src={item.img} alt={item.title} />
          </div>
        </div>
      ))}
    </div>
  );
}
