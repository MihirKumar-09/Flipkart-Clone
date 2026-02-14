import style from "./List.module.css";
import ListImage from "../../../../assets/Seller/list.png";
export default function ListProduct() {
  return (
    <div className={style.listProduct}>
      <h3>List Product</h3>
      <div className={style.listContainer}>
        <p>
          What is a listing? A listing refers to the process of registering your
          product on the Flipkart platform, making it visible to customers, and
          enabling them to view and purchase your product. It involves creating
          a detailed product page that includes essential information such as
          product title, description, images, pricing, and other relevant
          details. A well-crafted listing helps attract potential customers and
          facilitates the sale of your product on Flipkart.
        </p>
        <div>
          <img src={ListImage} alt="List Product" />
        </div>
      </div>
      <p>
        <span>
          <i
            className="fa-regular fa-lightbulb"
            style={{ color: "#FFD150", fontSize: "1.4rem" }}
          ></i>
        </span>
        Did you know that providing precise and comprehensive information about
        your product, along with clear and captivating images, can increase its
        visibility on our platform by up to 15%.
      </p>
      <div className={style.videoContainer}>
        <div className={style.videoStyle}>
          <h5>Listing on Flipkart can be done in 2 different ways:</h5>

          <div className={style.videoPage}>
            <div className={style.videoCard}>
              <p>1. Match with existing products</p>

              <iframe
                src="https://www.youtube.com/embed/jazZiaTb4_M"
                title="Match existing products"
                allowFullScreen
              ></iframe>

              <p>
                If your product is already available on Flipkart, you have the
                option to seamlessly link or 'Latch' onto the existing product
                listing. This allows you to make your product live on the
                platform without the need to create a separate listing.
              </p>
            </div>

            <div className={style.videoCard}>
              <p>2. New Product</p>

              <iframe
                src="https://www.youtube.com/embed/oKPV5sIjXF8"
                title="New product listing"
                allowFullScreen
              ></iframe>

              <p>
                For products not currently available on Flipkart, you'll need to
                provide complete information and create a new listing with
                details like description, dimensions, features, images, and
                usage instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
