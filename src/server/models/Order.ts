import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: Array<{
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  email: string;
  total: number;
  shipping: number;
  discount: number;
  coupon?: string;
  paymentMethod: string;
  paymentId: string;
  paymentDetails: {
    paymentIntentId?: string;
    paymentMethod?: string;
  };
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Refunded"
    | "Returned"
    | string;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String },
      phone: { type: String, required: true },
    },
    email: { type: String, required: true },
    total: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, required: true },
    coupon: { type: String },
    paymentMethod: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentDetails: {
      paymentIntentId: { type: String },
      paymentMethod: { type: String },
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Refunded",
        "Returned",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
