import mongoose, { Document, Schema } from "mongoose";
import { IWishlistItem } from "./WishlistItem";
import { IUser } from "./User"; // Assuming you have a User model

export interface IWishlist extends Document {
  user: IUser["_id"];
  items: IWishlistItem[];
}

const WishlistSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: [
    { type: mongoose.Types.ObjectId, ref: "WishlistItem", required: true },
  ],
});

export default mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema);
