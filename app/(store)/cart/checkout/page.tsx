import Layout from "@/client/components/layout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/client/components/ui/breadcrumb";
import React from "react";
import { CheckoutForm } from "./CheckoutForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCartItems } from "@/server/action/CartAction";

const Checkout = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/auth/login");
  }

  // if not cart item redirect to cart page
  const cartItems: any = await getCartItems();

  if (!cartItems || cartItems.items.length === 0) {
    return redirect("/cart");
  }

  console.log("checkout", cartItems);

  return (
    <Layout>
      <div className="container py-10 space-y-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-xs md:text-sm" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart" className="text-xs md:text-sm">
                Cart
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs md:text-sm">
                Checkout
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-semibold">Billing Details</h1>

        {/* cart Item */}
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default Checkout;
