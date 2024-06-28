import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId;
  imageUrl?: string;
  iconName?: string;
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    parentCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    imageUrl: { type: String },
    iconName: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
