import "server-only";
import { authOptions } from "@/client/lib/authOption";
import Wishlist from "@/server/models/Wishlist";
import WishlistItem from "@/server/models/WishlistItem";
import dbConnect from "@/server/utils/db";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const schema = z.object({
  productId: z.string(),
});

export const addToWishlist = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions); // Validate the session

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be logged in to add to wishlist",
      };
    }

    // Parse and validate the form data
    const productId = formData.get("productId") as string;
    const { success, error } = schema.safeParse({ productId });

    if (!success) {
      throw new Error("Invalid form data");
    }

    // Connect to the database
    await dbConnect();

    const userId = session.user.id; // Get the user's ID

    // Check if the user's wishlist exists
    let wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "items",
      populate: {
        path: "product",
        select: "name slug", // Specify only the fields you need
        model: "Product",
      },
    });

    if (!wishlist) {
      // Create a new wishlist if no wishlist exists
      const newWishlistItem = new WishlistItem({ product: productId });
      await newWishlistItem.save();
      await Wishlist.create({
        user: userId,
        items: [newWishlistItem._id],
      });
    } else {
      // Check if the wishlist already contains the product
      const existingItem = wishlist.items.find(
        (item: any) => item.product && item.product._id.toString() === productId
      );

      // If it exists, remove the product from the wishlist
      if (existingItem) {
        await Wishlist.findByIdAndUpdate(wishlist._id, {
          $pull: { items: existingItem._id },
        });
        await WishlistItem.findByIdAndDelete(existingItem._id);
        return { success: true };
      }

      // Add the product to the wishlist
      const newWishlistItem = new WishlistItem({ product: productId });
      await newWishlistItem.save();
      await Wishlist.findByIdAndUpdate(wishlist._id, {
        $push: { items: newWishlistItem._id },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { error: "An error occurred" };
  }
};
