import "./MobileAndTablets.css";
import About from "./About.jsx";
import Hero from "./Hero.jsx";
import FilterSidebar from "./FilterSidebar/FilterSidebar.jsx";
import UpcomingLunch from "./UpcomingLaunch.jsx";
import TopDeals from "./TopDeals.jsx";
import PremiumPhone from "./PremiumPhone.jsx";
import AppleMobile from "./AppleMobiles.jsx";
import AndroidMobiles from "./AndroidMobiles.jsx";

export default function MobilesCategory() {
  return (
    <>
      <div className="MobilesAndTabletsCategory">
        <section className="header-section">
          <About />
          <Hero />
        </section>
        <main className="content">
          <FilterSidebar />
          <div className="product-section">
            <UpcomingLunch />
            <TopDeals />
            <PremiumPhone />
            <AppleMobile />
            <AndroidMobiles />
          </div>
        </main>
      </div>
    </>
  );
}
