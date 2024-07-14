import "server-only";
import { authOptions } from "@/client/lib/authOption";
import { getServerSession } from "next-auth";

// Import models to ensure they are registered
import "@/server/models/Product";
import "@/server/models/CartItem";
import "@/server/models/Cart";
import "@/server/models/Order";
import dbConnect from "@/server/utils/db";
import Cart from "@/server/models/Cart";
import Wishlist from "@/server/models/Wishlist";

export async function getWishlistProduct() {
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

    const products = await Wishlist.findOne({ user: userId })
      .populate({
        path: "items",

        populate: {
          path: "product",
        },
      })
      .lean();

    return products || [];
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw new Error("Internal Server Error");
  }
}
