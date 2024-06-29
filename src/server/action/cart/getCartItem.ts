import "server-only";
import { authOptions } from "@/client/lib/authOption";
import { getServerSession } from "next-auth";

// Import models to ensure they are registered
import "@/server/models/Product";
import "@/server/models/CartItem";
import "@/server/models/Cart";
import "@/server/models/Order";
import dbConnect from "@/server/utils/db";

export async function getCartItem() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const db = await dbConnect();

    if (!db) {
      throw new Error("Database connection failed");
    }

    const cartItems = await db
      .model("Cart")
      .findOne({ user: userId })
      .populate({
        path: "items",

        populate: {
          path: "product",
          select: "name price thumbnail",
        },
      });

    if (!cartItems) {
      throw new Error("Cart not found");
    }

    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Internal Server Error");
  }
}
