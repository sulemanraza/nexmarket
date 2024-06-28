// types.ts
import { Document, ObjectId } from "mongoose";

export interface ICartItem extends Document {
  product: ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: ObjectId;
  items: ICartItem[];
}

export interface CheckoutFormData {
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  cartItems: {
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    price: number; // This could be derived from quantity * product.price, but keeping for compatibility
  }[];
  totalPrice: number;
}
