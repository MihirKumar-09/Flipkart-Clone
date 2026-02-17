import style from "./NotFound.module.css";
import Logo from "../../assets/HomePage/webLogo.png";
import LogoText from "../../assets/HomePage/LoginPageLogo.png";
import NoFoundLogo from "../../assets/NoFoundPage/noFound.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={style.noFoundContainer}>
      <nav>
        <span>
          <img src={LogoText} alt="Flipkart" />
          <img src={Logo} alt="Logo" />
        </span>
      </nav>
      <div className={style.container}>
        <img src={NoFoundLogo} alt="" />
        <p>
          Unfortunately the page you are looking for has been moved or deleted
        </p>
        <button onClick={() => navigate("/")}>GO TO HOME PAGE</button>
      </div>
    </div>
  );
}
