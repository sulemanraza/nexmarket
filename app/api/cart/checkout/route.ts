import dbConnect from "@/server/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/client/lib/authOption";
import { z } from "zod";
import Product from "@/server/models/Product";
import Stripe from "stripe";
import Order from "@/server/models/Order";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20",
});

const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  streetAddress: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  phone: z.string().min(1, "Phone Number is required"),
  email: z.string().email("Invalid email address"),
  cartItems: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      price: z.number().positive(),
    })
  ),
  totalPrice: z.number().positive("Total price must be a positive number"),
  shipping: z.number().nonnegative("Shipping must be a non-negative number"),
  discount: z.number().nonnegative("Discount must be a non-negative number"),
  coupon: z.string().optional(),
  paymentMethod: z.string(),
});
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.json();
    const parsedData = schema.safeParse(formData);

    if (!parsedData.success) {
      return new Response("Invalid form data", { status: 400 });
    }

    const {
      fullName,
      streetAddress,
      city,
      postalCode,
      phone,
      email,
      cartItems,
      totalPrice,
      shipping,
      discount,
      coupon,
    } = parsedData.data;

    await dbConnect();

    const userId = session.user.id;
    const verifiedCartItems = [];
    let calculatedTotalPrice = 0;

    for (const item of cartItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return new Response("Invalid product", { status: 400 });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotalPrice += itemTotal;

      verifiedCartItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    calculatedTotalPrice -= discount;
    calculatedTotalPrice += shipping;

    if (calculatedTotalPrice !== totalPrice) {
      return new Response("Invalid total price", { status: 400 });
    }

    const lineItems = verifiedCartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/checkout/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/checkout/checkout-cancel`,
      customer_email: email,
    });

    // Save initial order with status "Pending"
    await Order.create({
      user: userId,
      items: verifiedCartItems,
      shippingAddress: { fullName, streetAddress, city, postalCode, phone },
      email,
      total: totalPrice,
      shipping,
      discount,
      coupon,
      paymentMethod: "stripe",
      paymentId: stripeSession.id,
      status: "Pending",
    });

    return new Response(JSON.stringify({ id: stripeSession.id }), {
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
