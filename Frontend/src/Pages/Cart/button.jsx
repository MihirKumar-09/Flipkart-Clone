import style from "./button.module.css";
import { useDispatch } from "react-redux";
import {
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
export default function Button({ item }) {
  const dispatch = useDispatch();
  return (
    <div className={style.buttonContainer}>
      <div className={style.quantityControl}>
        <button onClick={() => dispatch(decreaseQuantity(item._id))}>-</button>

        <span>{item.quantity}</span>

        <button onClick={() => dispatch(increaseQuantity(item._id))}>+</button>
      </div>

      <button
        className={style.removeBtn}
        onClick={() => dispatch(deleteCart(item._id))}
      >
        REMOVE
      </button>
    </div>
  );
}
