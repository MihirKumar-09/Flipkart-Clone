import "./Fashion.css";
import Hero from "./Hero";
import TopCollections from "./TopCollections.jsx";
import MenFashions from "./MenFashions.jsx";
import WomenFashions from "./WomenFashions.jsx";
import BestShoes from "./BestShoes.jsx";
export default function Fashion() {
  return (
    <div className="fashion-section">
      <main className="main-fashion-container">
        <Hero />
        <TopCollections />
        <hr style={{ margin: "0px" }} />
        <MenFashions />
        <hr style={{ margin: "0px" }} />
        <WomenFashions />
        <hr style={{ margin: "0px" }} />
        <BestShoes />
      </main>
    </div>
  );
}
