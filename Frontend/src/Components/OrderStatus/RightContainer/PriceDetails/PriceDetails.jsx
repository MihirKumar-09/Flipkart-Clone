import style from "./PriceDetails.module.css";

export default function PriceDetails({ order }) {
  if (!order) return null; // 🔥 MOST IMPORTANT LINE

  const downloadInvoice = async (orderId) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/order/${orderId}/invoice`,
      {
        credentials: "include",
      },
    );

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
            Special price <i className="fa-solid fa-circle-info"></i>
          </span>
          <span>₹{order.itemsPrice?.toLocaleString("en-In")}</span>
        </div>

        <div>
          <span>Platform fee</span>
          <span>₹{order.platformFee}</span>
        </div>

        <hr style={{ margin: 0, border: "none", borderTop: "2px dotted" }} />

        <div>
          <span style={{ fontWeight: 600 }}>Total amount</span>
          <span style={{ fontWeight: 600 }}>
            ₹{order.totalPrice?.toLocaleString("en-In")}
          </span>
        </div>

        <div className={style.paymentMethod}>
          <span>Payment method</span>
          <span>
            {order.paymentMethod === "COD" ? (
              <i className="fa-solid fa-money-bill-wave"></i>
            ) : (
              <i className="fa-solid fa-building-columns"></i>
            )}
            <span style={{ marginLeft: "6px" }}>{order.paymentMethod}</span>
          </span>
        </div>

        <div
          className={style.downloadInvoice}
          onClick={() => downloadInvoice(order._id)}
        >
          <i className="fa-solid fa-file-arrow-down"></i>
          <span>Download Invoice</span>
        </div>
      </div>
    </div>
  );
}
