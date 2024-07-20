import dbConnect from "@/server/utils/db";
import Category, { ICategory } from "@/server/models/Category";
import Product, { IProduct } from "@/server/models/Product";
import Review from "@/server/models/Review";

export const getSingleCategory = async (
  slug: string
): Promise<{ category: ICategory; productItems: IProduct[] } | null> => {
  await dbConnect();

  const category = (await Category.findOne({ slug }).lean()) as ICategory;
  if (!category || !category._id) {
    return null;
  }

  const productItems = await Product.find({ category: category._id })
    .lean()
    .populate<{ category: ICategory }>("category");

  // Attach review statistics to each product
  for (const product of productItems) {
    const reviewStats = await Review.aggregate([
      { $match: { product: product._id } },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$star" },
          numReviews: { $sum: 1 },
        },
      },
    ]);

    const stats = reviewStats[0] || { averageRating: 0, numReviews: 0 };
    product.rating = stats.averageRating;
    product.numReviews = stats.numReviews;
  }

  return {
    category,
    productItems: productItems as unknown as IProduct[],
  };
};
