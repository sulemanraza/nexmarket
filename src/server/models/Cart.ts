import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface ICart extends Document {
  user: IUser["_id"];
  items: Array<mongoose.Types.ObjectId>;
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
