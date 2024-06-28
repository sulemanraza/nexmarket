import { TableComponent } from "@/client/components/Product/CartTable";
import { FlashProduct } from "@/client/components/Product/FlashProduct";
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
import { CartTable } from "./CartItemTable";
import { getCartItems } from "@/server/action/CartAction";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Cart = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const cartItems = await getCartItems();

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
              <BreadcrumbPage className="text-xs md:text-sm">
                Cart
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          {/* cart Item */}
          <CartTable cartItem={cartItems} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
