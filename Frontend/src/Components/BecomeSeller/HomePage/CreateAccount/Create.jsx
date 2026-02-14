import style from "./Create.module.css";
import CreateImage from "../../../../assets/Seller/create.webp";
export default function Create() {
  return (
    <div className={style.createAccount}>
      <h3>Create Account</h3>
      <div className={style.create}>
        <p>
          Creating your Flipkart seller account is a quick process, taking less
          than 10 minutes, and requires only 3 documents. Follow the checklist
          to ensure a seamless account creation experience. By having these
          documents ready, you can streamline the account creation process and
          get started on Flipkart as an online seller in no time.
        </p>
        <img src={CreateImage} alt="Create" />
      </div>
      <div className={style.gst}>
        <h5>Don’t have a GSTIN?</h5>
        <p>Follow the steps below to generate for your online business.</p>
        <div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#027cd5"
            >
              <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
            </svg>
            <p>Register / Login to www.gst.gov.in</p>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#027cd5"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm349-142q31-22 43-58h168v-360H200v360h168q12 36 43 58t69 22q38 0 69-22ZM200-200h560-560Zm80-270h400v-80H280v80Zm0-140h400v-80H280v80Z" />
            </svg>
            <p>Fill in GST Enrolment Application Form</p>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#027cd5"
            >
              <path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
            <p>Submit Enrolment Application</p>
          </span>
        </div>
      </div>
      <p>
        Flipkart offers a diverse range of over 3000+ categories where you can
        sell your products. These categories represent just a fraction of the
        wide variety available on Flipkart, providing ample opportunities for
        sellers to showcase their products to a large customer base. Here are
        some popular categories to consider for online selling:
      </p>
      <div className={style.category}>
        <h5>Popular categories to sell across India</h5>
        <div className={style.list}>
          <ul>
            <li>Sell Mobile</li>
            <li>Sell Electronics Online</li>
            <li>Sell Jewellery Online</li>
            <li>Sell Makeup Online</li>
            <li>Sell Books Online</li>
            <li>Sell Beauty Products Online</li>
            <li>Sell Shirt Online</li>
          </ul>
          <ul>
            <li>Sell Clothes Online</li>
            <li>Sell Women Clothes Online</li>
            <li>Sell Tshirts Online</li>
            <li>Sell Paintings Online</li>
            <li>Sell Home Products Online</li>
            <li>Sell Toys Online</li>
            <li>Sell Indian Clothes Online</li>
          </ul>
          <ul>
            <li>Sell Sarees Online</li>
            <li>Sell Shoes Online</li>
            <li>Sell Furniture Online</li>
            <li>Sell Watch Online</li>
            <li>Sell Kurtis Online</li>
            <li>Sell Appliance Online</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
