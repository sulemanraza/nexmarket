import "server-only";
import { authOptions } from "@/client/lib/authOption";
import { getServerSession } from "next-auth";
import { z } from "zod";
import dbConnect from "@/server/utils/db";
import Cart from "@/server/models/Cart";
import CartItem from "@/server/models/CartItem";

// ============================ add to Cart Item ============================
const addItemValidate = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export async function addToCartAction(formData: FormData) {
  const session = await getServerSession(authOptions); // Validate the session

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Parse and validate the form data ============================
  const productId = formData.get("productId") as string;
  const quantity = Number(formData.get("quantity"));
  const { success, error } = addItemValidate.safeParse({ productId, quantity });

  if (!success) {
    throw new Error("Invalid form data");
  }

  // Connect to the database
  await dbConnect();

  const userId = session.user.id;

  // Check if the user's cart exists
  let cart = await Cart.findOne({ user: userId }).populate({
    path: "items",
    populate: {
      path: "product",
      select: "name price", // Specify only the fields you need
      model: "Product",
    },
  });

  if (!cart) {
    // Create a new cart with the cart item if no cart exists
    const newCartItem = await CartItem.create({ product: productId, quantity });
    cart = await Cart.create({ user: userId, items: [newCartItem._id] });
  } else {
    // Check if the cart already contains the product
    const existingCartItem = cart.items.find(
      (item: any) => item.product && item.product._id.toString() === productId
    );

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      await CartItem.findByIdAndUpdate(existingCartItem._id, {
        $inc: { quantity: quantity },
      });
    } else {
      // Add a new item to the cart
      const newCartItem = await CartItem.create({
        product: productId,
        quantity,
      });
      cart.items.push(newCartItem._id);
    }

    await cart.save();
  }

  // Populate the cart items with product details before sending the response
  const cartItems = await Cart.findById(cart._id)
    .populate({
      path: "items",
      populate: {
        path: "product",
        select: "name price", // Specify only the fields you need
        model: "Product",
      },
    })
    .lean();

  return cartItems;
}
