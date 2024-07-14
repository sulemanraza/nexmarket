import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  street: string;
  city: string;
  postalCode: string;
  state: string;
  country?: string;
  role: "admin" | "editor" | "user";
  emailVerified?: boolean;
  provider?: string;
  providerId?: string;
  isBlocked?: boolean;
  lastLogin?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  phone: { type: String, default: "", match: /^[0-9]{10,11}$/ },
  password: { type: String, default: "" },
  street: { type: String, default: "" },
  city: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  country: { type: String, default: "" },
  role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
  emailVerified: { type: Boolean, default: false },
  provider: { type: String },
  providerId: { type: String },
  isBlocked: { type: Boolean, default: false },
  lastLogin: { type: Date },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
