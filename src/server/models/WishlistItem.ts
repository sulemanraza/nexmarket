import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./Product";

export interface IWishlistItem extends Document {
  product: IProduct["_id"];
}

const WishlistItemSchema: Schema = new Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
});

export default mongoose.models.WishlistItem ||
  mongoose.model<IWishlistItem>("WishlistItem", WishlistItemSchema);
