import "server-only";
import Review from "@/server/models/Review";
import Product from "@/server/models/Product";
import dbConnect from "@/server/utils/db";

export const getReviewByUserId = async (userId: any) => {
  await dbConnect();
  const reviews = await Review.find({ user: userId })
    .populate({
      path: "product",
      model: Product,
      select: "name slug thumbnail",

      populate: {
        path: "category",
        model: "Category",
        select: "name slug",
      },
    })
    .lean();

  if (reviews.length > 0) {
    return reviews.map((review: any) => {
      return {
        ...review,
        createdAt: new Date(review.createdAt).toLocaleDateString(),
      };
    });
  }

  return [];
};
