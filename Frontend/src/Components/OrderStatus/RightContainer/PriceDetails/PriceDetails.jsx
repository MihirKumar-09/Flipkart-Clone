import style from "./PriceDetails.module.css";
export default function PriceDetails({ order }) {
  const price = order.totalPrice;
  const platformFee = 7;
  const totalPrice = price + platformFee;

  const downloadInvoice = async (orderId) => {
    const res = await fetch(`http://localhost:8080/order/${orderId}/invoice`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Invoice download failed");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${orderId}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

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
        <div
          className={style.downloadInvoice}
          onClick={() => downloadInvoice(order._id)}
        >
          <i class="fa-solid fa-file-arrow-down"></i>
          <span>Download Invoice</span>
        </div>
      </div>
      <div className={style.offer}>
        <span>
          <span>
            <i class="fa-solid fa-trophy"></i>
          </span>
          <span>offers earned</span>
        </span>
        <span>
          <i class="fa-solid fa-angle-down"></i>
        </span>
      </div>
    </div>
  );
}
