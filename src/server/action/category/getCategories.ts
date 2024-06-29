import dbConnect from "@/server/utils/db";
import Category from "@/server/models/Category";

export async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}); // find all categories
  return categories;
}
