import style from "./Left.module.css";
import ProductDetails from "./ProductDetails.jsx/ProductDetails";
import OrderStatus from "./Status/Status";
import Rating from "./Rating/Rating";
import Others from "./Others/Others";
export default function LeftContainer({ order }) {
  return (
    <div className={style.left}>
      <div>
        <ProductDetails order={order} />
        <hr style={{ margin: "0px" }} />
        <OrderStatus order={order} />
      </div>
      <Rating order={order} />
      <Others order={order} />
    </div>
  );
}
