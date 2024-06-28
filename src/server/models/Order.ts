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
    streetAddress: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  email: string;
  total: number;
  shipping: number;
  discount: number;
  coupon?: string;
  paymentMethod: string;
  paymentDetails: {
    paymentIntentId?: string;
    paymentMethod?: string;
  };
  status: string;
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
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    email: { type: String, required: true },
    total: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, required: true },
    coupon: { type: String },
    paymentMethod: { type: String, required: true },
    paymentDetails: {
      paymentIntentId: { type: String },
      paymentMethod: { type: String },
    },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
