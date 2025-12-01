import "./HeroSection.css";

import Hero1 from "../../assets/HomePage/hero1.webp";
import Hero2 from "../../assets/HomePage/hero2.webp";
import Hero3 from "../../assets/HomePage/hero3.webp";
import Hero4 from "../../assets/HomePage/hero4.webp";
export default function Hero() {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={Hero1} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={Hero2} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={Hero3} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={Hero4} className="d-block w-100" alt="..." />
        </div>
      </div>

      <div className="prev-btn">
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
      </div>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
