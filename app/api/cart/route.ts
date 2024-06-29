import { type NextRequest } from "next/server";
import { getCartItem } from "@/server/action/cart/getCartItem";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  try {
    const data = await getCartItem();

    return Response.json(data.items, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
