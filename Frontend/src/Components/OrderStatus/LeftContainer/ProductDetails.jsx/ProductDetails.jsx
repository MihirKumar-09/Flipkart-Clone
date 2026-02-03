import style from "./ProductDetails.module.css";
export default function ProductDetails({ order }) {
  return (
    <div className={style.productDetails}>
      {/* Left Section */}
      {order.items.map((item) => (
        <div key={item.product._id} className={style.left}>
          <h5>{item.product.name}</h5>
          <ul>
            {item.product?.highlights?.[0] && (
              <p>{item.product.highlights[0]}</p>
            )}
          </ul>
          <h6>&#x20B9;{item.product.price.toLocaleString("en-IN")}</h6>
        </div>
      ))}

      {/* Right Section */}
      <div className={style.right}>
        {order?.items?.map(
          (item, index) =>
            item.image && <img key={index} src={item.image} alt={item.name} />,
        )}
      </div>
    </div>
  );
}
