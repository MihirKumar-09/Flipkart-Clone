import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "COD"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
        "RETURN_REQUESTED",
        "RETURN_APPROVED",
        "RETURN_COMPLETED",
        "RETURN_REQUEST_REJECTED",
      ],
      default: "PLACED",
    },
    returnReason: {
      type: String,
    },

    confirmedAt: Date,
    shippedAt: Date,
    outForDeliveryAt: Date,

    deliveredAt: Date,
    cancelledAt: Date,
    returnRequestedAt: Date,
    returnApprovedAt: Date,
    returnCompleteAt: Date,
    returnRejectedAt: Date,
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
