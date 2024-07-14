import "server-only";
import { authOptions } from "@/client/lib/authOption";
import dbConnect from "@/server/utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import "@/server/models/Product";
import Order from "@/server/models/Order";

export const getOrderById = async (orderId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return redirect("/auth/login");
    }

    // Connect to the database
    await dbConnect();

    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
      return null;
    }

    const order = await Order.findById({
      _id: orderId,
      user: session.user.id,
    })
      .populate({
        path: "items.product",
        model: "Product",
        select: "name price thumbnail slug category", // Specify the fields you want to include
        populate: {
          path: "category",
          model: "Category",
          select: "name slug",
        },
      })
      .lean();

    if (!order) {
      return null;
    }

    return order;
  } catch (error) {
    console.error("getOrderById", error);
    return null;
  }
};
