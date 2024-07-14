import "server-only";
import { authOptions } from "@/client/lib/authOption";
import Order from "@/server/models/Order";
import dbConnect from "@/server/utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "@/server/models/Product";

export const getOrders = async (status?: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return redirect("/auth/login");
    }

    // Connect to the database
    await dbConnect();

    const orders = await Order.find({
      user: session.user.id,
      ...(status && { status }),
    }).populate({
      path: "items.product",
      model: "Product",
      select: "name price thumbnail", // Specify the fields you want to include
    });

    if (!orders) {
      return [];
    }

    const columns = orders.map((order) => {
      return {
        id: order._id,
        name: order.shippingAddress.fullName,
        address: `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`,
        paymentMethod: order.paymentMethod,
        total: order.total,
        status: order.status,
        createdAt: new Date(order.createdAt).toLocaleDateString(),
      };
    });

    return columns;
  } catch (error) {
    console.error("getOrderById", error);
    return [];
  }
};
