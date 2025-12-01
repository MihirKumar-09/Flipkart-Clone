import { createSlice } from "@reduxjs/toolkit";

// Load saved cart
const savedCart = JSON.parse(localStorage.getItem("cart_items")) || [];

const initialState = {
  items: savedCart,
};

// Save cart
const save = (items) => {
  localStorage.setItem("cart_items", JSON.stringify(items));
};

// Create redux state slice;
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      save(state.items);
    },
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i._id === action.payload._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      save(state.items);
    },
    deleteCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      save(state.items);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity < 10) item.quantity += 1;
      }
      save(state.items);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
      }
      save(state.items);
    },
  },
});

// Extract action creators
export const { addToCart, deleteCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

// Export the reducers
export default cartSlice.reducer;
