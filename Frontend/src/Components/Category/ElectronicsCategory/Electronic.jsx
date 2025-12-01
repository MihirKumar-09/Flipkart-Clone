import "./Electronic.css";
import Hero from "./Hero.jsx";
import Container from "./container.jsx";
import TodayDeals from "./TodayDeals.jsx";
import AudioWave from "./AudioWave.jsx";
import PrimeStation from "./PrimeStation.jsx";
export default function Electronics() {
  return (
    <div className="electronics-category">
      <Hero />
      <main className="electronics-main-container">
        <Container />
        <TodayDeals />
        <AudioWave />
        <PrimeStation />
      </main>
    </div>
  );
}
