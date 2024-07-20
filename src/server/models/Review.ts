import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  star: number;
  title: string;
  review: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    star: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
