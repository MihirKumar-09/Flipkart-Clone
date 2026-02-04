import style from "./PriceDetails.module.css";
export default function PriceDetails({ order }) {
  const price = order.totalPrice;
  const platformFee = 7;
  const totalPrice = price + platformFee;
  return (
    <div className={style.priceDetails}>
      <h5>Price details</h5>
      <div className={style.allPrice}>
        <div>
          <span>
            Special price <i class="fa-solid fa-circle-info"></i>
          </span>
          <span>&#8377;{price.toLocaleString("en-In")}</span>
        </div>

        <div>
          <span>Platform fee</span>
          <span>&#8377;{platformFee.toLocaleString("en-In")}</span>
        </div>

        <hr
          style={{
            margin: "0px",
            border: "none",
            borderTop: "2px dotted ",
          }}
        />

        <div>
          <span style={{ fontWeight: "600" }}>Total amount</span>
          <span style={{ fontWeight: "600" }}>
            &#8377;{totalPrice.toLocaleString("en-In")}
          </span>
        </div>

        <div className={style.paymentMethod}>
          <span>Payment method</span>
          <span>
            {order.paymentMethod === "COD" ? (
              <i className="fa-solid fa-money-bill-wave"></i>
            ) : (
              <i class="fa-solid fa-building-columns"></i>
            )}
            <span style={{ marginLeft: "6px" }}>{order.paymentMethod}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
