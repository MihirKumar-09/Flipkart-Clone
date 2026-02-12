import style from "./Home.module.css";

// Import top bar;
import TopBar from "./TopBar/TopBar";
// Import Nav Bar;
import NavBar from "./NavBar/NavBar";
export default function Home() {
  return (
    <div>
      <TopBar />
      <NavBar />
    </div>
  );
}
