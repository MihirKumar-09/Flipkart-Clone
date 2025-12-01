import "./Appliance.css";
import Hero from "./Hero";
import About from "./About";
import BestSelling from "./BestSelling";
import AirConditioners from "./Summer";
import Kitchen from "./Kitchen";
export default function ApplianceProducts() {
  return (
    <div className="appliance-category">
      <div className="appliance-main-category">
        <Hero />
        <About />
        <main>
          <BestSelling />
          <AirConditioners />
          <Kitchen />
        </main>
      </div>
    </div>
  );
}
