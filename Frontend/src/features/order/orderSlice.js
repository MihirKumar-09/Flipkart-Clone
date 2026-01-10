import { createSlice } from "@reduxjs/toolkit";

const savedOrder = JSON.parse(localStorage.getItem("last_order"));

const initialState = {
  currentOrder: savedOrder || null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.currentOrder = action.payload;
      localStorage.setItem("last_order", JSON.stringify(action.payload));
    },
    clearOrder: (state) => {
      state.currentOrder = null;
      localStorage.removeItem("last_order");
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
