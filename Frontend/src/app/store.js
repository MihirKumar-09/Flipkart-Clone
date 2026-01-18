import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import buyNowReducer from "../features/buyNow/buyNowSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    buyNow: buyNowReducer,
  },
});
