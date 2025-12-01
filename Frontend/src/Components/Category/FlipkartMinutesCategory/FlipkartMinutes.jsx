import "./FlipkartMinutes.css";
import Location from "./Location";
import Navbar from "./Navbar";
import TenMinutes from "./Minutes";
import Grocery from "./Grocery";
import Snacks from "./Snacks";

export default function Minutes() {
  return (
    <div className="flipkart-minutes">
      <Navbar />
      <Location />
      <TenMinutes />
      <Grocery />
      <Snacks />
    </div>
  );
}
