import { PrintButton } from "@/client/components/reuseable/PrintButton";
import { Button } from "@/client/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { getOrderById } from "@/server/action/order/getOrderById";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FaStripe, FaCcPaypal } from "react-icons/fa6";

const SingleOrder = async ({ params }: any) => {
  const order: any = await getOrderById(params.id);

  if (!order) {
    return notFound();
  }

  const {
    _id,
    shippingAddress,
    paymentMethod,
    items,
    createdAt,
    discount,
    total,
    shipping,
  } = order;

  console.log(items[0]);

  return (
    <section className="relative order-details">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black">
            Your Order Confirmed
          </h2>
          <PrintButton />
        </div>
        <h6 className="font-medium text-xl leading-8 text-black mb-3">
          Hello, {shippingAddress.fullName}
        </h6>
        <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
          Your order has been completed and will be delivered in only two days.
        </p>

        <Table className="order-header">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Invoice</TableHead>
              <TableHead className="w-1/5">Delivery Date</TableHead>
              <TableHead className="w-1/5">Method</TableHead>
              <TableHead className="text-center w-2/5">Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#{_id}</TableCell>
              <TableCell className="font-medium">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="font-medium">
                {paymentMethod === "stripe" ? (
                  <FaStripe size={28} />
                ) : (
                  <FaCcPaypal size={28} />
                )}
              </TableCell>
              <TableCell className="font-medium text-right">
                {shippingAddress.street}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="order-items w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Product</TableHead>
              <TableHead className="w-1/4 text-right">Qty</TableHead>
              <TableHead className="w-1/4 text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(({ product, quantity }: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      <Link href={`/${product.category.slug}/${product.slug}`}>
                        <Image
                          src={product.thumbnail}
                          width={50}
                          height={50}
                          alt={product.name}
                        />
                      </Link>
                      <p className="ml-2">{product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{quantity}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Subtotal
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  items.reduce(
                    (acc: any, item: any) => acc + item.price * item.quantity,
                    0
                  )
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Shipping Charge
              </TableCell>
              <TableCell className="text-right">
                {shipping === 0
                  ? "Free"
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(shipping)}
              </TableCell>
            </TableRow>
            {discount > 0 && (
              <TableRow>
                <TableCell colSpan={2} className="font-semibold">
                  Discount
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(discount)}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={2} className="font-semibold">
                Total
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="data">
          <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
            We&apos;ll be sending a shipping confirmation email when the items
            have shipped successfully.
          </p>
          <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
            Thank you for shopping with us!
          </h6>
        </div>
      </div>
    </section>
  );
};

export default SingleOrder;
