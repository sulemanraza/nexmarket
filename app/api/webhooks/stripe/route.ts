import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/server/utils/db";
import Order from "@/server/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    const sig = request.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        text,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await dbConnect();

      // Retrieve the PaymentIntent object
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string
      );

      const paymentMethod = paymentIntent.payment_method;

      const order = await Order.findOneAndUpdate(
        { paymentId: session.id },
        {
          status: "Completed",
          paymentDetails: {
            paymentIntentId: session.payment_intent,
            paymentMethod: paymentMethod,
          },
        },
        { new: true }
      );

      console.log("Order completed:", order);
    }

    return new Response("Success!", { status: 200 });
  } catch (error: any) {
    console.error("Error handling webhook:", error);
    return new Response(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  }
}
