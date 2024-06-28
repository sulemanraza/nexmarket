// import "server-only";
"use server";
import { authOptions } from "@/client/lib/authOption";
import { getServerSession } from "next-auth";
import dbConnect from "../utils/db";
import Order from "../models/Order";
import Cart from "../models/Cart";
import { z } from "zod";

export const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  streetAddress: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  cartItems: z.array(
    z.object({
      product: z.object({
        _id: z.string(),
        name: z.string(),
        price: z.number().positive(),
      }),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ),
  totalPrice: z.number().positive("Total price must be a positive number"),
});

export async function handleCheckout(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  await dbConnect();

  const userId = session.user.id;

  const formInput = {
    fullName: formData.get("fullName") as string,
    streetAddress: formData.get("streetAddress") as string,
    city: formData.get("city") as string,
    postalCode: formData.get("postalCode") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    cartItems: JSON.parse(formData.get("cartItems") as string),
    totalPrice: Number(formData.get("totalPrice")),
  };

  const parsedData = schema.safeParse(formInput);

  if (!parsedData.success) {
    console.error("Validation failed:", parsedData.error.issues);
    throw new Error("Invalid form data");
  }

  const {
    fullName,
    streetAddress,
    city,
    postalCode,
    phone,
    email,
    cartItems,
    totalPrice,
  } = parsedData.data;

  const order = await Order.create({
    user: userId,
    items: cartItems,
    shippingAddress: { fullName, streetAddress, city, postalCode, phone },
    email,
    total: totalPrice,
  });

  // Clear the user's cart
  await Cart.findOneAndDelete({ user: userId });

  return order;
}
