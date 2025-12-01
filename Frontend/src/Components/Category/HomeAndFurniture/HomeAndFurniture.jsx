import "./HomeAndFurniture.css";
import Hero from "./Hero.jsx";
import PopularPorducts from "./PopularProducts.jsx";
import SpecialItems from "./SpecialItems.jsx";
import Offer from "./Offer.jsx";
import Discount from "./Discount.jsx";
import PremiumLook from "./PremiumLook.jsx";
import HomeDecorate from "./HomeDecorate.jsx";
import { PrefetchPageLinks } from "react-router-dom";
export default function HomeAndFurniture() {
  return (
    <div className="home-category">
      <section>
        <Hero />
      </section>
      <main className="home-main-container">
        <PopularPorducts />
        <SpecialItems />
        <Offer />
        <Discount />
        <PremiumLook />
        <HomeDecorate />
      </main>
    </div>
  );
}
