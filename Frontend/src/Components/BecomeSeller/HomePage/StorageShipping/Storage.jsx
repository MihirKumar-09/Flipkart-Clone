import style from "./Storage.module.css";
export default function Storage() {
  return (
    <div className={style.storageAndShipping}>
      <h3>Storage & Shipping</h3>
      <p>
        Congratulations on receiving your first order! When it comes to shipping
        your products to customers, Flipkart understands the importance of fast
        and reliable delivery in secure packaging.
      </p>
      <span>
        <p>We provide two fulfilment options for you to choose from</p>
        <ul>
          <li>Fulfilment by Flipkart (FBF)</li>
          <li>Non Fulfilment by Flipkart (NFBF)</li>
        </ul>
      </span>
      <p>
        Consider the fulfilment option that best suits your needs and
        preferences to ensure timely and secure delivery of your products to
        Flipkart customers.
      </p>
      <div className={style.storageContainer}>
        <div className={style.storageCard}>
          <div className={style.leftCard}>
            <h5>Fulfilment by Flipkart (FBF)</h5>
            <p>
              Eliminate worries about storage, packing, shipping, and delivery
              by leveraging Flipkart's Fulfilment by Flipkart (FBF) service. FBF
              offers a comprehensive solution that handles all your shipping
              needs under one roof. With FBF, you can entrust Flipkart to
              efficiently manage the entire process, from storing your products
              to expertly packing and shipping them to customers. Enjoy a
              hassle-free experience and focus on growing your business while
              Flipkart takes care of the logistics.
            </p>
            <ul>
              <li>Pick-up from seller location to Flipkart warehouse</li>
              <li>FAssured badge</li>
              <li>Faster delivery to customer</li>
              <li>Seamless order processing</li>
              <li>Customer returns handled end to end</li>
              <li>Warehouse space</li>
              <li>Quality selection recommendation</li>
              <li>Rigorous quality checks</li>
              <li>Quality packaging materials</li>
            </ul>
          </div>
          <div className={style.videoCard}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/HUDj5NbChv0?si=7eiF26qowImkHnAW"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className={style.storageContainer}>
        <div className={style.storageCard}>
          <div className={style.leftCard}>
            <h5>Non Fulfilment by Flipkart (NFBF)</h5>
            <p>
              With Non-Fulfillment by Flipkart (NFBF), you can benefit from
              end-to-end delivery of your products directly from your location
              to the customer. In NFBF, it is the responsibility of the seller
              to ensure that the product is properly packed and ready for
              dispatch before the Flipkart agent arrives at the seller's
              location. This service allows you to maintain control over the
              packaging process while leveraging Flipkart's logistics network
              for efficient and reliable delivery.
            </p>
            <ul>
              <li>Delivery to 19000+ pin codes across India</li>
              <li>Tracking of your product</li>
              <li>Customer returns support</li>
              <li>Logistics support from community warehouse available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
