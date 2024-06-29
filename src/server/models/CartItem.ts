// models/CartItem.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

const CartItemSchema: Schema = new Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CartItem ||
  mongoose.model<ICartItem>("CartItem", CartItemSchema);
