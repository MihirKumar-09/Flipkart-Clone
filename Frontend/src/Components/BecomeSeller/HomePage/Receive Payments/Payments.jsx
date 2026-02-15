import style from "./Payments.module.css";
import Assure from "../../../../assets/Seller/assure.svg";
import Payment from "../../../../assets/Seller/payment.webp";
export default function Payments() {
  return (
    <div className={style.receivePayment}>
      <h3>Receive Payments</h3>
      <div>
        <span>
          <img src={Assure} alt="FAssure" />
        </span>
        <p>
          FAssured by Flipkart is an exclusive reliability program designed to
          offer additional visibility and benefits to your products. By
          participating in FAssured, your products undergo extra quality checks
          and are guaranteed to be delivered within 2-4 days of ordering. The
          FAssured tag not only ensures faster delivery but also brings
          increased visibility, higher quality, and more orders for your
          products. It serves as Flipkart's seal of trust, emphasising
          reliability and speed. Earning the FAssured badge can lead to higher
          revenue and garner greater trust from customers, enhancing your
          overall online selling experience on Flipkart
        </p>
      </div>
      <div className={style.paymentContainer}>
        <div>
          <img src={Payment} alt="FAssure" />
          <span>
            <p>
              With a customer base of over 45 crore+ on Flipkart, you can expect
              orders from customers across India. To ensure your convenience,
              Flipkart ensures timely payments directly into your registered
              bank account, which you provided during the Flipkart account
              creation process. You can receive your payments as fast as 7 days*
              from the date of dispatch, enabling you to manage your cash flow
              efficiently and focus on growing your business.
            </p>
            <p>
              <a href="#">Know more</a> about Fees & Commission
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
