import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="nav-bar">
        <Link to="/">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <span>Flipkart Minutes</span>
      </div>
    </>
  );
}
