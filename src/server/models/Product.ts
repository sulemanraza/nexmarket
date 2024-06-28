import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  colors?: string[];
  sizes?: string[];
  category: mongoose.Types.ObjectId;
  images: string[];
  thumbnail: string;
  stock: number;
  rating?: number;
  numReviews?: number;
  views?: number;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    images: [{ type: String, required: true }],
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
