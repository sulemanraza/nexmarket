"use client";

import { Button } from "@/client/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { CloseX } from "@/client/icon";
import { proceedToCheckout } from "@/server/action/productActions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@/client/components/ui/use-toast";
import { RootState } from "@/client/redux/store";
import { RemoveCartItemButton } from "@/client/components/reuseable/RemoveCartItem";
import { ItemQuantity } from "@/client/components/reuseable/ItemQuantity";

export function CartTable({ cartItem }: any) {
  const cartItems: any = useSelector((state: RootState) => state.cart.items);

  const { toast } = useToast();
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0); // Example shipping cost

  useEffect(() => {
    const total = cartItems?.reduce(
      (acc: number, item: any) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(total);
  }, [cartItems]);

  const handleApplyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(total * 0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const handleProceedToCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Proceed to checkout");

    const items = cartItems.map((item: any) => ({
      productId: item.product.id,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const formData = new FormData();
    items.forEach((item: any) => {
      formData.append("items", JSON.stringify(item));
    });

    formData.append("coupon", coupon);

    const data = await proceedToCheckout(formData);

    console.log("Proceed to checkout items", data);

    if (data) {
      // Redirect to checkout page
      window.location.href = "/cart/checkout";
    }
  };

  return (
    <div className="space-y-4">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold min-w-48">Product</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead>
              <span className="text-center font-semibold">Quantity</span>
            </TableHead>
            <TableHead className="text-right font-semibold min-w-36">
              Subtotal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems?.map(({ product, quantity }: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-full">
                <div className="flex items-center gap-4 relative">
                  <div className="min-w-16 h-16 bg-gray-100 dark:bg-[#313D4F] rounded-md grid place-items-center">
                    <Image
                      width={60}
                      height={60}
                      src={product.thumbnail}
                      alt={product.name}
                      className="rounded-md p-1"
                    />
                  </div>

                  {quantity === 1 && (
                    <RemoveCartItemButton
                      productId={product._id}
                      className="cursor-pointer rounded-full p-1 w-5 h-5 grid place-items-center group absolute left-[-8px] top-[-8px]"
                    >
                      <CloseX className="w-4 h-4 text-brand absolute" />
                    </RemoveCartItemButton>
                  )}
                  <span>{product.name}</span>
                </div>
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </TableCell>
              <TableCell>
                <ItemQuantity productId={product._id} qty={quantity} />
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price * quantity)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="mt-4">
          <Link href="/">Return To Shop</Link>
        </Button>
        <Button variant="outline" className="mt-4">
          Update Cart
        </Button>
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="flex border h-fit w-96">
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

        <div className="w-96 border p-5 space-y-4">
          <div className="flex justify-between border-b">
            <span>Subtotal:</span>
            <span>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(total)}
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
          <div className="flex justify-between border-b">
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
              }).format(total - discount + shipping)}
            </span>
          </div>

          <form onSubmit={handleProceedToCheckout}>
            <Button
              type="submit"
              className="bg-brand w-full rounded-sm hover:bg-brand hover:opacity-90 min-w-fit border-l border-r-0 border-y-0"
            >
              Proceed to checkout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
