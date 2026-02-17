import mongoose from "mongoose";
const alertSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["stock", "price"],
      required: true,
    },
    targetPrice: {
      type: Number,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const Alert = mongoose.model("Alert", alertSchema);
export default Alert;
