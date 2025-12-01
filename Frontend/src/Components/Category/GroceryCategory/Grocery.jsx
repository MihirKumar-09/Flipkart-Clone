import style from "./Grocery.module.css";
import Nav from "./Navbar";
import SearchBar from "./SearchBar";
import Hero from "./HeroSection";
import DealsOfTheDay from "./DealsOfTheDay";
import ColdDrinks from "./ColdDrinks";
import NewLaunch from "./NewLaunch";
import GrabOrGone from "./GrabOrGone";
import Footer from "../../Layout/Footer/Footer";
export default function Grocery() {
  return (
    <div className={style.groceryWrapper}>
      <div className={style.groceryContainer}>
        <Nav />
        <SearchBar />
      </div>
      <Hero />
      <DealsOfTheDay />
      <ColdDrinks />
      <NewLaunch />
      <GrabOrGone />
      <Footer />
    </div>
  );
}
