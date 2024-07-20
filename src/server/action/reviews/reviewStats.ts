import "server-only";
// Calculate review stats for a product
import Review from "@/server/models/Review";
import dbConnect from "@/server/utils/db";

export const calculateReviewStats = async (productId: any) => {
  await dbConnect();
  const stats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$star" },
        numReviews: { $sum: 1 },
        fiveStar: { $sum: { $cond: [{ $eq: ["$star", 5] }, 1, 0] } },
        fourStar: { $sum: { $cond: [{ $eq: ["$star", 4] }, 1, 0] } },
        threeStar: { $sum: { $cond: [{ $eq: ["$star", 3] }, 1, 0] } },
        twoStar: { $sum: { $cond: [{ $eq: ["$star", 2] }, 1, 0] } },
        oneStar: { $sum: { $cond: [{ $eq: ["$star", 1] }, 1, 0] } },
      },
    },
  ]);

  if (!stats || stats.length === 0) {
    return {
      averageRating: 0,
      numReviews: 0,
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    };
  }

  return stats[0];
};
