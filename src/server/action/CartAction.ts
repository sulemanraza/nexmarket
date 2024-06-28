// import "server-only";
"use server";
import { authOptions } from "@/client/lib/authOption";
import { getServerSession } from "next-auth";
import Cart from "../models/Cart";
import dbConnect from "../utils/db";
import CartItem from "../models/CartItem";
import { z } from "zod";

// ============================ add to Cart Item ============================
const addItemValidate = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export async function addToCartItem(formData: FormData) {
  // Validate the session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Parse and validate the form data
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

// ============================ remove Cart Item ============================
const removeItemValidate = z.object({
  productId: z.string(),
});

export async function removeCartItem(formData: FormData) {
  // Validate the session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Parse and validate the form data
  const parsedData = {
    productId: formData.get("productId") as string,
  };
  const { success, error } = removeItemValidate.safeParse(parsedData);
  if (!success) {
    throw new Error("Invalid form data");
  }

  // Connect to the database
  await dbConnect();

  const { productId } = parsedData;
  const userId = session.user.id;

  // Find the user's cart
  const userCart = await Cart.findOne({ user: userId });
  if (!userCart) {
    throw new Error("Cart not found");
  }

  // Find and remove the cart item
  const cartItem = await CartItem.findOneAndDelete({ product: productId });
  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // Remove the item from the cart's items array
  userCart.items.pull(cartItem._id);
  await userCart.save();

  // Populate the updated cart items with product details
  const cartItems = await Cart.findOne({ user: userId })
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
        select: "name price thumbnail", // Adjust fields as necessary
      },
    })
    .lean();

  return cartItems;
}

// ============================ add qty and remove qty ============================

const updateQuantityValidate = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
});

export async function updateCartItemQuantity(formData: FormData) {
  // Validate the session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Parse and validate the form data
  const parsedData = {
    productId: formData.get("productId") as string,
    quantity: Number(formData.get("quantity")),
  };
  const { success, error } = updateQuantityValidate.safeParse(parsedData);
  if (!success) {
    throw new Error("Invalid form data");
  }

  // Connect to the database
  await dbConnect();

  const { productId, quantity } = parsedData;
  const userId = session.user.id;

  // Find the user's cart
  const userCart = await Cart.findOne({ user: userId }).populate("items");
  if (!userCart) {
    throw new Error("Cart not found");
  }

  // Find the cart item
  const cartItem = userCart.items.find(
    (item: any) => item.product.toString() === productId
  );
  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // Update the quantity of the cart item
  await CartItem.findByIdAndUpdate(cartItem._id, { quantity });

  // Populate the updated cart items with product details
  const updatedCart = await Cart.findById(userCart._id)
    .populate({
      path: "items",
      populate: { path: "product", model: "Product" },
    })
    .lean();

  return updatedCart;
}

// ============================ fetch Cart Items ============================

export async function getCartItems() {
  await dbConnect();
  // Validate the session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Connect to the database
  await dbConnect();

  const cartItems = await Cart.findOne({ user: userId })
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
        select: "name price thumbnail", // Adjust fields as necessary
      },
    })
    .lean();

  return cartItems;
}
