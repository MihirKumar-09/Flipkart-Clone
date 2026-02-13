import style from "./Home.module.css";

// Import top bar;
import TopBar from "./TopBar/TopBar";
// Import Nav Bar;
import NavBar from "./NavBar/NavBar";
// Import Hero Page;
import HeroPage from "./HeroPage/Hero";
// Import Success story page;
import SuccessStory from "./SuccessStory/Success";
export default function Home() {
  return (
    <div className={style.homePage}>
      <TopBar />
      <NavBar />
      <HeroPage />
      <SuccessStory />
    </div>
  );
}
