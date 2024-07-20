import "@/server/models/Category";

// export async function getProducts() {
//   await dbConnect();
//   const products = await Product.find({}).populate("category").lean();

//   return products;
// }

import dbConnect from "@/server/utils/db";
import Product from "@/server/models/Product";
import Wishlist from "@/server/models/Wishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/client/lib/authOption";

// export async function getProducts() {
//   await dbConnect();

//   // Get the user session
//   const session = await getServerSession(authOptions);
//   const userId = session?.user?.id;

//   // Fetch products
//   const products = await Product.find({}).populate("category").lean();

//   if (userId) {
//     // Fetch the user's wishlist
//     const wishlist = await Wishlist.findOne({ user: userId }).populate({
//       path: "items",
//       populate: {
//         path: "product",
//         select: "_id",
//       },
//     });

//     // Create a set of product IDs in the wishlist
//     const wishlistProductIds = new Set(
//       wishlist?.items.map((item: any) => item.product._id.toString())
//     );

//     // Add wishlist status to products
//     products.forEach((product: any) => {
//       product.isInWishlist = wishlistProductIds.has(product._id.toString());
//     });
//   } else {
//     // No user is logged in, set all products as not in wishlist
//     products.forEach((product) => {
//       product.isInWishlist = false;
//     });
//   }

//   return products;
// }

export async function getProducts() {
  await dbConnect();

  // Get the user session
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // Fetch products
  const products = await Product.find({}).populate("category").lean();

  // Attach review statistics to each product
  for (const product of products) {
    const reviewStats = await Product.aggregate([
      { $match: { _id: product._id } },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews",
        },
      },
      {
        $project: {
          averageRating: { $avg: "$reviews.star" },
          numReviews: { $size: "$reviews" },
        },
      },
    ]);

    const stats = reviewStats[0] || { averageRating: 0, numReviews: 0 };
    product.rating = stats.averageRating;
    product.numReviews = stats.numReviews;
  }

  if (userId) {
    // Fetch the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "product",
        select: "_id",
      },
    });

    // Create a set of product IDs in the wishlist
    const wishlistProductIds = new Set(
      wishlist?.items.map((item: any) => item.product._id.toString())
    );

    // Add wishlist status to products
    products.forEach((product: any) => {
      product.isInWishlist = wishlistProductIds.has(product._id.toString());
    });
  } else {
    // No user is logged in, set all products as not in wishlist
    products.forEach((product) => {
      product.isInWishlist = false;
    });
  }

  return products;
}
