import style from "./Left.module.css";
import ProductDetails from "./ProductDetails.jsx/ProductDetails";
import OrderStatus from "./Status/Status";
import Buttons from "./Buttons/Buttons";
import Rating from "./Rating/Rating";
import Others from "./Others/Others";
export default function LeftContainer({ order }) {
  return (
    <div className={style.left}>
      <div>
        <ProductDetails order={order} />
        <hr style={{ margin: "0px" }} />
        <OrderStatus order={order} />
        <hr style={{ margin: "0px" }} />
        <Buttons order={order} />
      </div>
      <Rating order={order} />
      <Others order={order} />
    </div>
  );
}
