import { type NextRequest } from "next/server";
import { getCartItem } from "@/server/action/cart/getCartItem";
import { cookies } from "next/headers";

async function getCookieData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      // cookies will be called outside of the async context, causing a build-time error
      resolve(cookies().getAll());
    }, 1000)
  );
}
export async function GET(request: NextRequest) {
  try {
    const data = await getCartItem();

    return Response.json(data.items, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
