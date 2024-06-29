import Product from "@/server/models/Product";
import "@/server/models/Category";
import dbConnect from "@/server/utils/db";

export async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).populate("category").lean();
  return products;
}
