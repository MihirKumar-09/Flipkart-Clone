import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Please enter the price above 1"],
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  image: [
    {
      url: { type: String, required: true },
      filename: { type: String, required: true },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  highlights: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", productSchema);
export default Product;
