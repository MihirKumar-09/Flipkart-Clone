import "./Beauty.css";
import Hero from "./Hero";
import FeatureProducts from "./FeaturesProducts";
import NewArrival from "./NewArrival";
import BestProducts from "./BestProducts";
import DealsOfTheDay from "./DealsOfTheDay";
import FoodSell from "./FoodSell";
import ToDayOffers from "./ToDayOffers";
import SummerSpecial from "./SummerSpecial";
export default function Teddy() {
  return (
    <div className="beauty">
      <div className="beauty-section">
        <Hero />
        <main>
          <FeatureProducts />
          <NewArrival />
          <BestProducts />
          <DealsOfTheDay />
          <FoodSell />
          <ToDayOffers />
          <SummerSpecial />
        </main>
      </div>
    </div>
  );
}
