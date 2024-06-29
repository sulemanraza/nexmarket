import Product from "@/server/models/Product";
import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  try {
    const data = await Product.find({}).lean().populate("category");

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
