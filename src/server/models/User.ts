import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "editor" | "user";
  emailVerified?: boolean;
  provider?: string;
  providerId?: string;
  isBlocked?: boolean;
  lastLogin?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
  emailVerified: { type: Boolean, default: false },
  provider: { type: String },
  providerId: { type: String },
  isBlocked: { type: Boolean, default: false },
  lastLogin: { type: Date },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
