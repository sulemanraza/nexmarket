import "server-only";
import { authOptions } from "@/client/lib/authOption";
import dbConnect from "@/server/utils/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import "@/server/models/Product";
import Order from "@/server/models/Order";
import UserAddress from "@/server/models/UserAddress";

export const getUserAddress = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return redirect("/auth/login");
    }

    // Connect to the database
    await dbConnect();

    const address = await UserAddress.find({
      user: session.user.id,
    });

    console.log("address", address);

    if (address.length === 0) {
      return [];
    }

    return address;
  } catch (error) {
    console.error("getOrderById", error);
    return null;
  }
};
