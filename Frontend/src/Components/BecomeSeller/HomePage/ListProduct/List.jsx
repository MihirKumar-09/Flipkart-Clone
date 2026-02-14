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
      <div className={style.videoContainer}>Video</div>
    </div>
  );
}
