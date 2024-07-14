"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectCartItems,
  selectIsLoading,
  selectTotalPrice,
  updateTotalItems,
} from "@/client/redux/store/slices/cartSlice";
import { Skeleton } from "@/client/components/ui/skeleton";
import { Button } from "@/client/components/ui/button";
import Image from "next/image";
import { ShippingAddress } from "./ShippingAddress";
import { loadStripe } from "@stripe/stripe-js";
import { SkeletonOrderSummary } from "./SkeletonOrderSummary";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CheckoutForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const isLoading = useSelector(selectIsLoading);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(totalPrice);

  useEffect(() => {
    setTotal(totalPrice - discount + shipping);
  }, [totalPrice, discount, shipping]);

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(totalPrice * 0.1);
    } else {
      setDiscount(0);
    }
    dispatch(updateTotalItems());
  };

  const onSubmit = async (values: any) => {
    try {
      const formData = {
        fullName: values.fullName,
        street: values.street,
        city: values.city,
        postalCode: values.postalCode,
        phone: values.phone,
        email: values.email,
        cartItems: cartItems.map(({ product, quantity }: any) => ({
          product: product._id,
          quantity,
          price: product.price,
        })),
        totalPrice: total,
        shipping,
        discount,
        coupon,
        paymentMethod: values.paymentMethod,
        saveAddress: values.saveAddress,
      };

      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (error) {
          console.error("Stripe redirect error:", error);
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="flex justify-between flex-col lg:flex-row">
      <ShippingAddress onSubmit={onSubmit} />
      {isLoading || !cartItems.length ? (
        <SkeletonOrderSummary />
      ) : (
        <div className="space-y-4 w-full lg:w-2/5">
          <div className="w-full space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Your Order</h2>
              <div className="flex justify-between border-b pb-1">
                <span>Product</span>
                <span>Price</span>
              </div>
              <div className="space-y-2">
                {cartItems.map(({ product, quantity }: any) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div className="min-w-16 h-16 bg-gray-100 dark:bg-[#313D4F] rounded-md grid place-items-center">
                      <Image
                        width={60}
                        height={60}
                        src={product.thumbnail}
                        alt={product.name}
                        className="rounded-md p-1"
                      />
                    </div>
                    <span>
                      {quantity} x{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                        .format(product.price)
                        .replace(".00", "")}
                    </span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Subtotal:</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalPrice)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between border-b">
                <span>Discount:</span>
                <span className="line-through text-red-500">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-b pb-1">
              <span>Shipping:</span>
              <span>
                {shipping > 0
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(shipping)
                  : "Free"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </span>
            </div>
            <div className="flex border h-fit w-full">
              <input
                name="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-[80%] indent-4"
                placeholder="Enter coupon code"
              />
              <Button
                onClick={handleApplyCoupon}
                className="bg-brand hover:bg-brand hover:opacity-90 min-w-fit border-l rounded-none border-r-0 border-y-0"
              >
                Apply Coupon
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
