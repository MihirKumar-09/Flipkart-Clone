import NavBar from "../../Components/Layout/HomeNavbar";
import Category from "../../Components/Category/Category";
import HeroSction from "../../Components/Home/HeroSection";
import TopDeals from "../../Components/Home/TopDeals";
import TrendingNow from "../../Components/Home/TrendingNow";
import LifeStyle from "../../Components/Home/LifeStyle";
import Fashion from "../../Components/Home/Fashions";
import HotCollection from "../../Components/Home/HotCollection";
import SuggestItem from "../../Components/Home/SuggestItem";
import TrendingGadgets from "../../Components/Home/TrendingGadgets";
import Adventure from "../../Components/Home/Adventure";
import ToyGames from "../../Components/Home/ToyAndGames";
import HomeAppliance from "../../Components/Home/HomeAppliance";
import FlipkartTravell from "../../Components/Home/FlipkartTravell";
import Footer from "../../Components/Layout/Footer/Footer";
export default function Hero() {
  return (
    <>
      <NavBar />
      <Category />
      <HeroSction />
      <TopDeals />
      <TrendingNow />
      <LifeStyle />
      <Fashion />
      <HotCollection />
      <SuggestItem />
      <TrendingGadgets />
      <Adventure />
      <ToyGames />
      <HomeAppliance />
      <FlipkartTravell />
      <Footer />
    </>
  );
}
