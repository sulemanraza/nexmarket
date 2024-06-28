import dbConnect from "@/server/utils/db";
import Cart from "@/server/models/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/client/lib/authOption";

export async function GET(request: Request) {
  try {
    await dbConnect();
    console.log("Database connected successfully");

    const session = await getServerSession(authOptions);
    console.log("Session details:", session);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    console.log("User ID:", userId);

    const cartItems = await Cart.findOne({ user: userId })
      .populate({
        path: "items",
        populate: {
          path: "product",
          model: "Product",
          // select: "name price thumbnail ",
        },
      })
      .lean();

    console.log("Cart Items:", cartItems);

    if (!cartItems) {
      return new Response("Cart not found", { status: 404 });
    }

    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
