import style from "./Success.module.css";
import CS1 from "../../../../assets/Seller/cs1.jpeg";
import CS2 from "../../../../assets/Seller/cs2.jpeg";
import CS3 from "../../../../assets/Seller/cs3.jpeg";
export default function SuccessStory() {
  return (
    <div className={style.successStory}>
      <h1>
        <span>Seller Success</span> <span>Stories</span>
      </h1>

      <div
        id="carouselExample"
        data-bs-ride="carousel"
        className={`carousel slide ${style.carouselWrapper}`}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className={style.carouselItem}>
              <div className={style.imageContainer}>
                <div>
                  <img src={CS1} alt="" />
                </div>
              </div>
              <div className={style.aboutContainer}>
                <h4>Raju Lunawath</h4>
                <p>
                  Starting with just one category, their unwavering support and
                  innovative platform empowered me to grow exponentially,
                  expanding to six diverse categories and achieving an
                  astounding 5x growth year on year.
                </p>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className={style.carouselItem}>
              <div className={style.imageContainer}>
                <div>
                  <img src={CS2} alt="" />
                </div>
              </div>
              <div className={style.aboutContainer}>
                <h4>Dinesh Kumar Raj</h4>
                <p>
                  On Flipkart, your listings are live in less than 2 hours and
                  you can start selling anywhere in India. I started my business
                  with 3 products, and today I own 3 brands and have also
                  created employment opportunities for my family and team of 25.
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className={style.carouselItem}>
              <div className={style.imageContainer}>
                <div>
                  <img src={CS3} alt="" />
                </div>
              </div>
              <div className={style.aboutContainer}>
                <h4>Raju Lunawath</h4>
                <p>
                  When moving from offline to online business, our aim was to
                  sell 300 orders per month. Today, we sell more than 700 orders
                  per day and this has been possible because of the growth
                  features on the Flipkart seller dashboard, Flipkart Ads and
                  regular payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
}
