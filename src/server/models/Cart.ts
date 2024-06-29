// models/Cart.ts
import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { ICartItem } from "./CartItem";

export interface ICart extends Document {
  user: IUser["_id"];
  items: Array<ICartItem["_id"]>;
}

const CartSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    items: [{ type: mongoose.Types.ObjectId, ref: "CartItem" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cart ||
  mongoose.model<ICart>("Cart", CartSchema);
